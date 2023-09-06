import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  comment: string;

  @IsNumber()
  content_id: number;

  @IsNumber()
  created_user_id: number;
}
