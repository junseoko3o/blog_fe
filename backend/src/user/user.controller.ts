import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) {}

    @Post('signup')
    async UserSignUp(@Body() createData: CreateUserDto) {
      return await this.userService.signUpUser(createData);
    }

    @Post('login')
    async login(
      @Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
      // const user = await this.authService.validateUser(loginDto);
      // const access_token = await this.authService.generateAccessToken(user);
      // const refresh_token = await this.authService.generateRefreshToken(user);
    
    // 유저 객체에 refresh-token 데이터 저장 
      // await this.userService.setCurrentRefreshToken(refresh_token,user.id);
  
      // res.setHeader('Authorization', 'Bearer ' + [access_token, refresh_token]);
      // res.cookie('access_token', access_token, {
      //   httpOnly: true,
      // });
      // res.cookie('refresh_token', refresh_token, {
      //   httpOnly: true,
      // });
      // return {
      //   message: 'login success',
      //   access_token: access_token,
      //   refresh_token: refresh_token,
      // };
    }
}
