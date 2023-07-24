import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRepository } from '../user.repository';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import * as bcrypt from 'bcrypt';
import CryptoAes256Gcm from 'src/common/crypto/crypto';

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
    private readonly crypto: CryptoAes256Gcm,
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
    return this.jwtService.signAsync({ id: payload.id }, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    });
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<{ access_token: string }> {
    const decryptedRefreshToken = await this.crypto.decryptAes256Gcm(refreshTokenDto.refresh_token);
    const verifyRefreshToken = await this.jwtService.verify(decryptedRefreshToken, { secret: process.env.JWT_REFRESH_SECRET }) as Payload;
    const userId = verifyRefreshToken.id;
    const user = await this.userService.getUserIfRefreshTokenMatches(refreshTokenDto.refresh_token, userId);
    if (!user) {
      throw new UnauthorizedException('Invalid user!');
    }

    const access_token = await this.generateAccessToken(user);
    return {
      access_token,
    };
  }
}