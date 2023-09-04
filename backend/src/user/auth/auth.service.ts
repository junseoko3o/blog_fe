import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { RedisCacheService } from '../../common/redis/redis-cache.service';
import { v4 as uuidv4 } from 'uuid';
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
    private readonly jwtService: JwtService,  
    private readonly configService: ConfigService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

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
    return this.jwtService.signAsync({
      id: payload.id,
      user_email: payload.user_email
     }, 
     {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    },);
  }

  async setRefreshToken(user_email: string, refresh_token: string) {
    const user = await this.userService.findOneUserEmail(user_email);
    const hashedToken = await this.getCurrentHashedRefreshToken(refresh_token);
    await this.redisCacheService.setKeyValue(user_email, hashedToken, 'PX', parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME));
    await this.userService.updateUser(user.id, {
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
    const user: User = await this.userService.findOneUser(id);
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