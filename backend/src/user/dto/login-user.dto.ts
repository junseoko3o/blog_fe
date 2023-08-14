import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsDate, IsOptional, IsString } from "class-validator";

export class LoginUserDto extends PartialType(CreateUserDto) {
  @IsString()
  user_email: string;

  @IsString()
  password: string;

  @IsDate()
  @IsOptional()
  login_at: Date;
}