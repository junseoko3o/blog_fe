import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';
import { ContentService } from 'src/content/content.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userService: UserService,
    private readonly contentService: ContentService,
  ) {}

  async findAllComment() {
    return await this.commentRepository.findAllComment();
  }

  async findOneComment(id: number) {
    const comment = await this.commentRepository.findOneComment(id);
    if (!comment) {
      throw new NotFoundException('Comment is not found.');
    }
    return comment;
  }
}
