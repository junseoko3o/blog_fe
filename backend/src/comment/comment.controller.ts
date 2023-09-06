import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './comment.entity';
import { Content } from 'src/content/content.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('list')
  async findAllComment(): Promise<Comment[]> {
    return await this.commentService.findAllComment();
  }

  @Get('list/:id')
  async findOneComment(@Param('id') id: number): Promise<Comment> {
    return await this.commentService.findOneComment(id);
  }

  @Get('content/:content_id')
  async findOneContentWithAllComment(@Param('content_id') content_id: number): Promise<Comment[]> {
    return await this.commentService.findOneContentWithAllComment(content_id);
  }

  @Post()
  async createComment(@Body() createData: CreateCommentDto): Promise<Comment> {
    return await this.commentService.createComment(createData);
  }
}
