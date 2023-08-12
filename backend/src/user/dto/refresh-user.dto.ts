import { IsDate, IsOptional, IsString } from "class-validator";

export class RefreshUserDto {
  @IsString()
  refresh_token: string;

  @IsDate()
  @IsOptional()
  refresh_token_expired_at: Date;

  @IsDate()
  @IsOptional()
  login_at: Date;
}