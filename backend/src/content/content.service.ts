import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Content } from "./content.entity";
import { UpdateContentDto } from "./dto/update-content.dto";
import { CreateContentDto } from "./dto/create-content.dto";
import { ContentRepository } from "./content.repository";
import { UserService } from "src/user/user.service";
import { Comment } from "src/comment/comment.entity";

@Injectable()
export class ContentService {
  constructor(
    private readonly contentRepository: ContentRepository,
    private readonly userService: UserService,
  ) {}

  async findAllContents(): Promise<Content[]> {
    return await this.contentRepository.findAllContents();
  }

  async findOneContent(id: number): Promise<Content> {
    const content = await this.contentRepository.findOneContent(id);
    if (!content) {
      throw new NotFoundException('Content is not found.');
    }
    return content;
  }
  
  async findOneConentUserName(user_name: string): Promise<Content> {
    const content = await this.contentRepository.findOneContentOfUserName(user_name);
    if (!content) {
      throw new NotFoundException('Content is not found.');
    }
    return content;
  }

  async findOneContentWithAllComment(id: number): Promise<Comment[]> {
    await this.findOneContent(id);
    const comment = await this.contentRepository.findOneContentWithAllComment(id);
    return comment.comment;
  }

  async searchTitleContent(searchKeyword: string): Promise<Content[]> {
    return await this.contentRepository.searchTitleContent(searchKeyword);
  }

  async createContent(createData: CreateContentDto): Promise<Content> {
    const findUser = await this.userService.findOneUser(createData.created_user_id);
    const content = new Content();
    content.title = createData.title;
    content.content = createData.content;
    content.user_name = findUser.user_name;
    content.created_user_id = createData.created_user_id;
    
    await this.contentRepository.createContent(content);
    return content;
  }

  async updateContent(id: number, updateData: UpdateContentDto): Promise<Content> {
    await this.contentRepository.findOneContent(updateData.updated_user_id);
    await this.findOneContent(id);
    const content = new Content();
    content.title = updateData.title;
    content.content = updateData.content;
    content.updated_user_id = updateData.updated_user_id;

    await this.contentRepository.updateContent(id, content);
    return content;
  }

  async deleteContent(id: number): Promise<string> {
    const findContent = await this.findOneContent(id);
    if (!findContent) {
      throw new BadRequestException('content is not found.');
    }
    await this.contentRepository.deleteContent(id);
    return 'delete success!';
  }
}
