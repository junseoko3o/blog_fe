import { IsNumber, IsString } from "class-validator";

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsNumber()
  created_user_id: number;
}
