import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async updateComment(id: number, updateData: UpdateCommentDto) {
    await this.findOneComment(id);
    await this.userService.findOneUser(updateData.updated_user_id);
    await this.contentService.findOneContent(updateData.content_id);
    const comment = new Comment();
    comment.comment = updateData.comment;
    comment.content_id = updateData.content_id;
    comment.updated_user_id = updateData.updated_user_id;

    await this.commentRepository.updateComment(id, updateData);

    return comment;
  }

  async deleteComment(id: number): Promise<string> {
    const comment = await this.findOneComment(id);
    const user = await this.userService.findOneUser(comment.content_id);
    if (comment.created_user_id !== user.id) {
      throw new BadRequestException('This comment is not yout comment.');
    }
    await this.commentRepository.deleteComment(id);
    return 'deleted successfully';
  }
}
