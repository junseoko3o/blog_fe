import { IsDate, IsOptional, IsString } from "class-validator";

export class RefreshUserDto {
  @IsString()
  refresh_token: string;

  @IsDate()
  @IsOptional()
  refresh_token_expired_at: Date;

  @IsString()
  @IsOptional()
  login_at: string;
}