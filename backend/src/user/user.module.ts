import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmCustomModule } from 'src/common/custom/custom.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtRefreshStrategy } from './auth/jwt-refresh.strategy';
import { JwtAccessAuthGuard } from './auth/jwt-access.guard';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository(UserRepository),
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
        } 
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    AuthService,
    JwtModule,
    JwtRefreshStrategy,
    JwtAccessAuthGuard,
  ]
})
export class UserModule {}
