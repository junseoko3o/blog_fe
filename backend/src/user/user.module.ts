import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtRefreshStrategy } from './auth/jwt-refresh.strategy';
import { JwtAccessAuthGuard } from './auth/jwt-access.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import CryptoAes256Gcm from 'src/common/crypto/crypto';
import { RedisCacheService } from 'src/common/redis/redis-cache.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          // expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
        } 
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    UserRepository,
    JwtModule,
    JwtRefreshStrategy,
    JwtAccessAuthGuard,
    CryptoAes256Gcm,
    RedisCacheService,
  ],
  exports: [
    UserService,
    UserRepository,
  ]
})
export class UserModule {}
