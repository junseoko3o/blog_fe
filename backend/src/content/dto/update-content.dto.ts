import { PartialType } from '@nestjs/mapped-types';
import { CreateContentDto } from './create-content.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateContentDto extends PartialType(CreateContentDto) {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  contents: string;

  @IsNumber()
  updated_user_id: number;
}
