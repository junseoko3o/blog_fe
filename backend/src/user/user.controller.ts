import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) {}

    @Post('signup')
    async UserSignUp(@Body() createData: CreateUserDto) {
      return await this.userService.signUpUser(createData);
    }
}
