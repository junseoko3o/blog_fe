import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RedisCacheService } from 'src/common/redis/redis-cache.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async findAllUser() {
    return await this.userRepository.findAllUser();
  }

  async findOneUser(id: number) {
    return await this.userRepository.findOneUser(id);
  }

  async findOneUserWithContent(id: number) {
    await this.findOneUser(id);
    const user = await this.userRepository.findOneUserWithContent(id);
    return user.content;
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

  async setCurrentRefreshToken(user_email: string, refresh_token: string) {
    const user = await this.userRepository.findOneUserEmail(user_email);
    const hashedToken = await this.getCurrentHashedRefreshToken(refresh_token);
    await this.redisCacheService.setKeyValue(user_email, hashedToken, 'EX', parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME));
    await this.userRepository.updateUser(user.id, {
      user_name: user.user_name,
      password: user.password,
      login_at: new Date(),
    });
  }

  async getCurrentHashedRefreshToken(refresh_token: string) {
    const currentRefreshToken = await bcrypt.hash(refresh_token, 10);
    return currentRefreshToken;
  }
  
  async getUserIfRefreshTokenMatches( id: number, refresh_token: string): Promise<User> {
    const user: User = await this.findOneUser(id);
    const getRefreshTokenInRedis = await this.redisCacheService.getKey(user.user_email);
    const isRefreshTokenMatching = await bcrypt.compare(
      refresh_token,
      getRefreshTokenInRedis
    );
    if (isRefreshTokenMatching) {
      return user;
    } 
    return user;
  }

  async removeRefreshToken(id: number) {
    return await this.redisCacheService.deleteKeyValue(id);
  }
}
