import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentsRepository } from './contents.repository';

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
}
