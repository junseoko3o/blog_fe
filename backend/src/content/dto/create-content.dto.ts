import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  created_user_id: number;
}
