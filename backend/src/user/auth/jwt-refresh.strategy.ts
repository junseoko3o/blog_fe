import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { User } from "../user.entity";
import { AuthService, Payload } from "./auth.service";
import { RedisCacheService } from "src/common/redis/redis-cache.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly authService: AuthService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.refresh_token;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: Payload) {
    const refreshToken = req.cookies['refresh_token'];
    const getRefreshTokenInRedis = await this.redisCacheService.getKey(payload.user_email);
    if (!getRefreshTokenInRedis) {
      throw new UnauthorizedException('refreshToken is not exist.');
    }
    const user: User = await this.authService.getUserIfRefreshTokenMatches(
      payload.id,
      refreshToken,
    );
    return user;
  }
}