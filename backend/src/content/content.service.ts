import { BadRequestException, Injectable } from "@nestjs/common";
import { Content } from "./content.entity";
import { UpdateContentDto } from "./dto/update-content.dto";
import { CreateContentDto } from "./dto/create-content.dto";
import { ContentRepository } from "./content.repository";

@Injectable()
export class ContentService {
  constructor(
    private readonly contentRepository: ContentRepository
  ) {}

  async findAllContents() {
    return await this.contentRepository.findAllContents();
  }

  async findOneContent(id: number) {
    return await this.contentRepository.findOneContent(id);
  }

  async createContent(createData: CreateContentDto) {
    const findUser = await this.contentRepository.findOneContent(createData.created_user_id);
    if (!findUser && findUser.id !== createData.created_user_id) {
      throw new BadRequestException('user is not found.');
    }
    const content = new Content();
    content.title = createData.title;
    content.contents = createData.contents;
    content.user_name = findUser.user_name;
    content.created_user_id = createData.created_user_id;
    
    await this.contentRepository.createContent(content);
    return content;
  }

  async updateContent(id: number, updateData: UpdateContentDto) {
    const findUser = await this.contentRepository.findOneContent(updateData.updated_user_id);
    const findContent = await this.findOneContent(id);
    if (!findUser && findUser.id !== updateData.updated_user_id) {
      throw new BadRequestException('user is not found.');
    } else if (!findContent) {
      throw new BadRequestException('content is not found.');
    }
    const content = new Content();
    content.title = updateData.title;
    content.contents = updateData.contents;
    content.updated_user_id = updateData.updated_user_id;

    await this.contentRepository.updateContent(id, content);
    return content;
  }

  async deleteContent(id: number) {
    const findContent = await this.findOneContent(id);
    if (!findContent) {
      throw new BadRequestException('content is not found.');
    }
    await this.contentRepository.deleteContent(id);
    return 'delete success!';
  }
}
