import { Controller } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('contents')
export class ContentsController {
  constructor(
    private readonly contentsService: ContentsService,
  ) {}

  async findAllContents() {
    return await this.contentsService.findAllContents();
  }
}
