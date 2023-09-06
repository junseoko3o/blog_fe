import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}
  
  canActivate(context: ExecutionContext): boolean{
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    return true;
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    if (request.cookies['access_token']) {
      return true;
    }

    if (isPublic) {
      return true;
    } throw new UnauthorizedException('login please...');
  }
}
