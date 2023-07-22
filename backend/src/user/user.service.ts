import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

  async findAllUser() {
    return await this.userRepository.findAllUser();
  }

  async findOneUser(id: number) {
    return await this.userRepository.findOneUser(id);
  }

  async signUpUser(createData: CreateUserDto) {
    const findUser = await this.userRepository.findOneUserEmail(createData.user_email);
    const hashedPassword = await bcrypt.hash(createData.password, 10);

    if (findUser) {
      throw new BadRequestException('user is already exist.')
    }

    const user = new User();
    user.user_email = createData.user_email
    user.user_name = createData.user_name;
    user.password = hashedPassword;

    await this.userRepository.createUser(user);
    return user;
  }

  async updateUser(id: number, updateData: UpdateUserDto) {
    const findUser = await this.userRepository.findOneUser(id);
    if (!findUser) {
      throw new BadRequestException('user is not found.');
    }

    const user = new User();
    user.user_name = updateData.user_name;
    user.password = updateData.password;

    await this.userRepository.updateUser(id, user);
    return user;
  }

  async deleteUser(id: number) {
    const findUser = await this.userRepository.findOneUser(id);
    if (!findUser) {
      throw new BadRequestException('user is not found.');
    }
    await this.userRepository.deleteUser(id);
    return 'success delete user!';
  }

  async setCurrentRefreshToken( id: number, refresh_token: string) {
    const currentRefreshToken = await this.getCurrentHashedRefreshToken(refresh_token);
    const currentRefreshTokenExp = await this.getCurrentRefreshTokenExp();
    const a =await this.userRepository.update(id, {
      refresh_token: currentRefreshToken,
      refresh_token_expired_at: currentRefreshTokenExp,
      login_at: new Date().toISOString(),
    });
  }

  async getCurrentHashedRefreshToken(refresh_token: string) {
    const currentRefreshToken = await bcrypt.hash(refresh_token, 10);
    return currentRefreshToken;
  }

  async getCurrentRefreshTokenExp(): Promise<Date> {
    const currentDate = new Date();
    const currentRefreshTokenExp = new Date(currentDate.getTime() + parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME')));
    return currentRefreshTokenExp;
  }
  
  async getUserIfRefreshTokenMatches(refresh_token: string, id: number): Promise<User> {
    const user: User = await this.findOneUser(id);
	
	// user에 currentRefreshToken이 없다면 null을 반환 (즉, 토큰 값이 null일 경우)
    if (!user.refresh_token) {
      return null;
    }
	
    // 유저 테이블 내에 정의된 암호화된 refresh_token값과 요청 시 body에 담아준 refresh_token값 비교
    const isRefreshTokenMatching = await bcrypt.compare(
      refresh_token,
      user.refresh_token
    );

	// 만약 isRefreshTokenMatching이 true라면 user 객체를 반환
    if (isRefreshTokenMatching) {
      return user;
    } 
  }

  async removeRefreshToken(id: number) {
    return await this.userRepository.update(id, {
      refresh_token: null,
      refresh_token_expired_at: null,
    });
  }
}
