import { Body, Controller, Post, Req, Res, UseGuards, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthService } from './auth/auth.service';
import { JwtRefreshGuard } from './auth/jwt-refresh.guard';
import { JwtAccessAuthGuard } from './auth/jwt-access.guard';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    ) {}

    @Get('list')
    async findAllUser() {
      return await this.userService.findAllUser();
    }

    @Get('find/:id')
    async findOneUser(@Param('id') id: number) {
      return await this.findOneUser(id);
    }

    @Post('signup')
    async userSignUp(@Body() createData: CreateUserDto) {
      return await this.userService.signUpUser(createData);
    }

    @Post('update/:id')
    async userUpdate(@Param('id') id: number, @Body() updateData: UpdateUserDto) {
      return await this.userService.updateUser(id, updateData);
    }

    @Post('delete/:id')
    async deleteUser(@Param('id') id: number) {
      return await this.userService.deleteUser(id);
    }

    @Post('login')
    async login(
      @Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
      const user = await this.authService.validateUser(loginDto);
      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
    
      await this.userService.setCurrentRefreshToken(refreshToken,user.id);
  
      res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
      res.cookie('access_token', accessToken, {
        httpOnly: true,
      });
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
      });
      return {
        id: user.id,
        email: user.user_email,
        user_name: user.user_name,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    }

    @Post('logout')
    @UseGuards(JwtRefreshGuard)
    async logout(@Req() req: any, @Res() res: Response) {
      await this.userService.removeRefreshToken(req.user.id);
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      return res.send({
        message: 'logout success'
      });
    }

    @Post('refresh')
    async regenerateRefreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Res({ passthrough: true }) res: Response) {
        const newAccessToken = (await this.authService.refresh(refreshTokenDto)).access_token;
        res.setHeader('Authorization', 'Bearer ' + newAccessToken);
        res.cookie('access_token', newAccessToken, {
          httpOnly: true,
        });
        res.send({newAccessToken});
    }

    @Get('authenticate')
    @UseGuards(JwtAccessAuthGuard)
    async user(@Req() req: any, @Res() res: Response) {
      const id: number = req.user.id; 
      const verifiedUser: User = await this.userService.findOneUser(id);
      const { password, ...result } = verifiedUser; 
      return res.send(result);
    }
}
