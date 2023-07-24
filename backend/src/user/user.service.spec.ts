import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let configService: ConfigService;
  
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
          },
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('createUser', () => {
    it('signUp User.', async () => {
      const createDto: CreateUserDto = {
        user_name: 'junseok',
        user_email: 'junseok@gmail.com',
        password: '12345',
      };
      jest.spyOn(qr.manager, 'save').mockReturnValue(undefined)
      jest.spyOn(userRepository, 'findOneUserEmail');
      const result = async () => {
        await userService.signUpUser(createDto);
      };
      expect(result).toBeDefined();
    });
    it('should be 4', () => {
      expect(2+2).toEqual(4);
    })
  });
})