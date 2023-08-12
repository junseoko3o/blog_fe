import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post()
  async createContent(@Body() createData: CreateContentDto) {
    return await this.contentsService.createContent(createData);
  }

  @Post(':id')
  async updateContent(@Param('id') id: number, @Body() updateData: UpdateContentDto) {
    return await this.contentsService.updateContent(id, updateData);
  }
}
