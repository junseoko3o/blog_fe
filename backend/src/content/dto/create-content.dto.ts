import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsString()
  @IsOptional()
  user_name: string;

  @IsNumber()
  created_user_id: number;
}
