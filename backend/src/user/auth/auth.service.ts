import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRepository } from '../user.repository';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
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
  ) {}
  
  async validateUser(loginData: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOneUserEmail(loginData.user_email);

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    if (!await bcrypt.compare(loginData.password, user.password)) {
      throw new BadRequestException('Invalid credentials!');
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
    const { refresh_token } = refreshTokenDto;

    // Verify refresh token
    // JWT Refresh Token 검증 로직
    const decodedRefreshToken = this.jwtService.verify(refresh_token, { secret: process.env.JWT_REFRESH_SECRET }) as Payload;

    // Check if user exists
    const userId = decodedRefreshToken.id;
    const user = await this.userService.getUserIfRefreshTokenMatches(refresh_token, userId);
    if (!user) {
      throw new UnauthorizedException('Invalid user!');
    }

    // Generate new access token
    const access_token = await this.generateAccessToken(user);

    return {
      access_token,
    };
  }
}