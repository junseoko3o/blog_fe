import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  user_email: string;

  @IsString()
  user_name: string;

  @IsString()
  password: string;
}
