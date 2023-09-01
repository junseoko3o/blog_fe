import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
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

  async findOneUserEmail(user_email: string) {
    const user = await this.userRepository.findOneUserEmail(user_email);
    if (!user) {
      throw new NotFoundException('User is not found.');
    }
    return user;
  }

  async validateUser(loginData: LoginUserDto): Promise<User> {
    const user = await this.findOneUserEmail(loginData.user_email);
    const matchPassword = await bcrypt.compare(loginData.password, user.password);
    if (!matchPassword) {
      throw new BadRequestException('Invalid credentials.');
    }
    return user;
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
}
