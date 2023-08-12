import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAccessAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const access_token = request.cookies['access_token'];
      const user = await this.jwtService.verify(access_token);
      request.user = user;

      if (request.user) {
        return true;
      }
    } catch(err) {
      throw new UnauthorizedException('Invalid access token.');
    }
  }
}