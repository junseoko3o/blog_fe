import { BadRequestException, Injectable } from "@nestjs/common";
import { Content } from "./content.entity";
import { UpdateContentDto } from "./dto/update-content.dto";
import { CreateContentDto } from "./dto/create-content.dto";
import { ContentRepository } from "./content.repository";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class ContentService {
  constructor(
    private readonly contentRepository: ContentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAllContents(): Promise<Content[]> {
    return await this.contentRepository.findAllContents();
  }

  async findOneContent(id: number): Promise<Content> {
    return await this.contentRepository.findOneContent(id);
  }

  async createContent(createData: CreateContentDto): Promise<Content> {
    const findUser = await this.userRepository.findOneUser(createData.created_user_id);
    if (!findUser && findUser.id !== createData.created_user_id) {
      throw new BadRequestException('user is not found.');
    }
    const content = new Content();
    content.title = createData.title;
    content.content = createData.content;
    content.user_name = findUser.user_name;
    content.created_user_id = createData.created_user_id;
    
    await this.contentRepository.createContent(content);
    return content;
  }

  async updateContent(id: number, updateData: UpdateContentDto): Promise<Content> {
    const findUser = await this.contentRepository.findOneContent(updateData.updated_user_id);
    const findContent = await this.findOneContent(id);
    if (!findUser && findUser.id !== updateData.updated_user_id) {
      throw new BadRequestException('user is not found.');
    } else if (!findContent) {
      throw new BadRequestException('content is not found.');
    }
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
