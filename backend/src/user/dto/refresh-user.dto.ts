import { IsDate, IsString } from "class-validator";

export class RefreshUserDto {
  @IsString()
  refresh_token: string;

  @IsDate()
  refresh_token_expired_at: Date;

  @IsString()
  login_at: string;
}