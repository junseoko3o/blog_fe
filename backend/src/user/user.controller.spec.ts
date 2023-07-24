import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService, // UserService requires UserRepository and ConfigService
        UserRepository, // Add UserRepository as a provider
        ConfigService, // Add ConfigService as a provider
        JwtService,
        AuthService,
        {
          provide: DataSource,
          useValue: {
            createEntityManager: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
              setParameter: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockReturnThis(),
            })),
          },
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
