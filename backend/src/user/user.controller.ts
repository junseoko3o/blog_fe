import { Body, Controller, Post, Req, Res, UseGuards, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { JwtRefreshGuard } from './auth/jwt-refresh.guard';
import { JwtAccessAuthGuard } from './auth/jwt-access.guard';
import { User } from './user.entity';
import { Public } from './auth/public.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    ) {}

    @Get('list')
    async findAllUser(): Promise<User[]> {
      return await this.userService.findAllUser();
    }

    @Get('list/:id')
    async findOneUser(@Param('id') id: number): Promise<User> {
      return await this.userService.findOneUser(id);
    }

    @Get('content/:id')
    async findOneUserWithContent(@Param('id') id: number) {
      return await this.userService.findOneUserWithContent(id);
    }

    @Post('signup')
    @Public()
    async userSignUp(@Body() createData: CreateUserDto): Promise<User> {
      return await this.userService.signUpUser(createData);
    }

    @Post('update/:id')
    async userUpdate(@Param('id') id: number, @Body() updateData: UpdateUserDto): Promise<User> {
      return await this.userService.updateUser(id, updateData);
    }

    @Post('delete/:id')
    async deleteUser(@Param('id') id: number): Promise<string> {
      return await this.userService.deleteUser(id);
    }

    @Post('login')
    @Public()
    async login(@Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
      const user = await this.userService.validateUser(loginDto);
      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
    
      await this.authService.setRefreshToken(user.user_email, refreshToken);
      res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME),
      });
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME),
      });
      return {
        id: user.id,
        user_email: user.user_email,
        user_name: user.user_name,
        access_token: accessToken,
        login_at: new Date(),
      }
    }

    @Post('logout')
    @UseGuards(JwtRefreshGuard)
    async logout(@Req() req: Request, @Res() res: Response) {
      await this.authService.removeRefreshToken(req.user.id);
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      return res.send({
        message: 'logout success'
      });
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    async regenerateAccessToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
      const user = req.user;
      const newAccessToken = await this.authService.refresh(user);
      res.setHeader('Authorization', 'Bearer ' + newAccessToken);
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        maxAge: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME),
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
    async user(@Req() req: Request, @Res() res: Response) {
      const id: number = req.user.id; 
      const verifiedUser: User = await this.userService.findOneUser(id);
      const { password, ...result } = verifiedUser; 
      return res.send(result);
    }
}
