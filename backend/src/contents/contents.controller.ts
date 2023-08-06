import { Controller, Get, Param } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('contents')
export class ContentsController {
  constructor(
    private readonly contentsService: ContentsService,
  ) {}

  @Get('list')
  async findAllContents() {
    return await this.contentsService.findAllContents();
  }

  @Get(':id')
  async findOneContent(@Param('id') id: number) {
    return await this.contentsService.findOneContent(id);
  }
}
