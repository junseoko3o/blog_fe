import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsString()
  comment: string;

  @IsNumber()
  content_id: number;

  @IsNumber()
  updated_user_id: number;
}
