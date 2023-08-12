import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentsRepository } from './contents.repository';
import { Content } from './content.entity';

@Injectable()
export class ContentsService {
  constructor(
    private readonly contentsRepository: ContentsRepository
  ) {}

  async findAllContents() {
    return await this.contentsRepository.findAllContents();
  }

  async findOneContent(id: number) {
    return await this.contentsRepository.findOneContent(id);
  }

  async createContent(createData: CreateContentDto) {
    const findUser = await this.contentsRepository.findOneContent(createData.created_user_id);
    if (!findUser && findUser.id !== createData.created_user_id) {
      throw new BadRequestException('user is not found.');
    }
    const content = new Content();
    content.title = createData.title;
    content.contents = createData.contents;
    content.user_name = findUser.user_name;
    content.created_user_id = createData.created_user_id;
    
    await this.contentsRepository.createContent(content);
    return content;
  }

  async updateContent(id: number, updateData: UpdateContentDto) {
    const findUser = await this.contentsRepository.findOneContent(updateData.updated_user_id);
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

    await this.contentsRepository.updateContent(id, content);
    return content;
  }
}
