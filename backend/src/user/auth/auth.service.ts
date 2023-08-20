import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRepository } from '../user.repository';
import { RedisCacheService } from '../../common/redis/redis-cache.service';
import * as bcrypt from 'bcrypt';

export interface Payload {
  id: number;
  user_email: string;
  user_name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,  
    private readonly configService: ConfigService,
    private readonly redisCacheService: RedisCacheService,
  ) {}
  
  async validateUser(loginData: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOneUserEmail(loginData.user_email);
    const matchPassword = await bcrypt.compare(loginData.password, user.password);
    if (!user) {
      throw new NotFoundException('User not found!')
    }
    if (!matchPassword) {
      throw new BadRequestException('Invalid credentials.');
    }
    return user;
  } 

  async generateAccessToken(user: User): Promise<string> {
    const payload: Payload = {
      id: user.id,
      user_email: user.user_email,
      user_name: user.user_name,
    }
    return this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload: Payload = {
      id: user.id,
      user_email: user.user_email,
      user_name: user.user_name,
    }
    return this.jwtService.signAsync({ id: payload.id, user_email: payload.user_email }, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    });
  }

  async refresh(user: User) : Promise<string>{
    const findOneUser = await this.userService.findOneUser(user.id);
    const getKeyInRedis = await this.redisCacheService.getKey(user.user_email);
    const accessToken = await this.generateAccessToken(user);
    if (!findOneUser) {
      throw new UnauthorizedException('User is not found.');
    }
    if (!getKeyInRedis) {
      throw new UnauthorizedException('RefreshToken is not found.');
    }
    return accessToken;
  }
}