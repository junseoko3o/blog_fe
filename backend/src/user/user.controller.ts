import { Body, Controller, Post, Req, Res, UseGuards, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AuthService } from './auth/auth.service';
import { JwtRefreshGuard } from './auth/jwt-refresh.guard';
import { JwtAccessAuthGuard } from './auth/jwt-access.guard';
import { User } from './user.entity';
import { Public } from './auth/public.decorator';
import { RefreshUserDto } from './dto/refresh-user.dto';

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

    @Get('list/:id')
    async findOneUser(@Param('id') id: number) {
      return await this.userService.findOneUser(id);
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
    @Public()
    async login(@Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
      const user = await this.authService.validateUser(loginDto);
      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
    
      await this.userService.setCurrentRefreshToken(user.id, {
        refresh_token: user.refresh_token,
        refresh_token_expired_at: user.refresh_token_expired_at,
        login_at: user.login_at.toISOString(),
      });
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
        login_at: user.login_at
      };
    }

    @Post('logout')
    @UseGuards(JwtRefreshGuard)
    async logout(@Req() req: any, @Res() res: Response) {
      await this.userService.removeRefreshToken(req.user.id, req.user.refresh_token);
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      return res.send({
        message: 'logout success'
      });
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    async regenerateRefreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
      const user = req.user;
      const newAccessToken = await this.authService.refresh(user);
      res.setHeader('Authorization', 'Bearer ' + newAccessToken);
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
      });
      res.send({
        id: user.id,
        user_email: user.user_email,
        user_name: user.user_name,
        access_token: newAccessToken,
      });
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
