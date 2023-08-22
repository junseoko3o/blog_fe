import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let configService: ConfigService;
  let createdUser: User; 
  
  const qr = {
    manager: {},
  } as QueryRunner;

  beforeEach(async () => {
    Object.assign(qr.manager, {
      save: jest.fn(),
    });
    qr.connect = jest.fn();
    qr.release = jest.fn();
    qr.startTransaction = jest.fn();
    qr.commitTransaction = jest.fn();
    qr.rollbackTransaction = jest.fn();
    qr.release = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        ConfigService,
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
            createQueryRunner: jest.fn(() => ({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
            })),
          },
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    configService = module.get<ConfigService>(ConfigService);

    createdUser = new User();
    createdUser.user_name = 'junseok';
    createdUser.user_email = 'junseok@gmail.com';
    createdUser.password = 'hashedPassword';

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(createdUser.password);
    jest.spyOn(userRepository, 'findOneUserEmail').mockResolvedValue(null);
  });

  describe('createUser', () => {
    it('signUp User.', async () => {
         // Given
         const createDto: CreateUserDto = {
          user_name: 'junseok',
          user_email: 'junseok@gmail.com',
          password: '12345',
        };
        const hashedPassword = 'hashedPassword';
        const findUser = null;
  
        jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
        jest.spyOn(userRepository, 'findOneUserEmail').mockResolvedValue(findUser);
  
        // When
        const result: User = await userService.signUpUser(createDto);
  
        // Then
        expect(result).toBeInstanceOf(User);
        expect(result.user_name).toEqual(createDto.user_name);
        expect(result.user_email).toEqual(createDto.user_email);
        expect(result.password).toEqual(hashedPassword);
  
        expect(userRepository.findOneUserEmail).toHaveBeenCalledWith(createDto.user_email);
    });
  });
  describe('setCurrentRefreshToken', () => {
    it('should update the user with the provided refresh token', async () => {
      // Given
      const userId = 1;
      const refreshToken = 'refreshTokenValue';
      const currentRefreshTokenHash = 'currentRefreshTokenHash';
      const currentRefreshTokenExp = new Date();

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(currentRefreshTokenHash);
      // jest.spyOn(userService, 'getCurrentRefreshTokenExp').mockResolvedValue(currentRefreshTokenExp);
       jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
      // When
      // await userService.setCurrentRefreshToken(userId, refreshToken);

      // Then
      expect(userRepository.update).toHaveBeenCalledWith(userId, {
        refresh_token: currentRefreshTokenHash,
        refresh_token_expired_at: currentRefreshTokenExp,
        login_at: expect.any(String),
      });
    });
  });
  describe('getUserIfRefreshTokenMatches', () => {
    it('should return the user if the provided refresh token matches the stored hashed token', async () => {
      // Given
      const userId = 1;
      const refreshToken = 'refreshTokenValue';
      const hashedRefreshToken = 'hashedRefreshToken';

      const user = new User();
      // user.refresh_token = hashedRefreshToken;

      jest.spyOn(userService, 'findOneUser').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      // When
      // const result = await userService.getUserIfRefreshTokenMatches(userId, refreshToken);

      // Then
      expect(userService.findOneUser).toHaveBeenCalledWith(userId);
      expect(bcrypt.compare).toHaveBeenCalledWith(refreshToken, hashedRefreshToken);
      // expect(result).toBe(user);
    });

    it('should return undefined if the provided refresh token does not match the stored hashed token', async () => {
      // Given
      const userId = 1;
      const refreshToken = 'refreshTokenValue';
      const hashedRefreshToken = 'hashedRefreshToken';

      const user = new User();
      // user.refresh_token = hashedRefreshToken;

      jest.spyOn(userService, 'findOneUser').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      // When
      // const result = await userService.getUserIfRefreshTokenMatches(userId, refreshToken);

      // Then
      expect(userService.findOneUser).toHaveBeenCalledWith(userId);
      expect(bcrypt.compare).toHaveBeenCalledWith(refreshToken, hashedRefreshToken);
      // expect(result).toBeUndefined();
    });
  });
})