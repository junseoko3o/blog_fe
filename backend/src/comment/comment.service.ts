import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';
import { ContentService } from 'src/content/content.service';
import { UserService } from 'src/user/user.service';
import { Comment } from './comment.entity';

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

  async findOneContentWithAllComment(content_id: number) {
    const allComment = await this.contentService.findOneContentWithAllComment(content_id);
    return allComment;
  }

  async createComment(createData: CreateCommentDto) {
    const user = await this.userService.findOneUser(createData.created_user_id);
    await this.contentService.findOneContent(createData.content_id);
    const comment = new Comment();
    comment.comment = createData.comment;
    comment.content_id = createData.content_id;
    comment.created_user_id = createData.created_user_id;
    comment.user_name = user.user_name;

    await this.commentRepository.createComment(comment);
    return comment;
  }
}
