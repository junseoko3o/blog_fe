import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './content.entity';

@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @Get('list')
  async findAllContents(): Promise<Content[]> {
    return await this.contentService.findAllContents();
  }

  @Get(':id')
  async findOneContent(@Param('id') id: number): Promise<Content> {
    return await this.contentService.findOneContent(id);
  }

  @Post()
  async createContent(@Body() createData: CreateContentDto): Promise<Content> {
    return await this.contentService.createContent(createData);
  }

  @Post(':id')
  async updateContent(@Param('id') id: number, @Body() updateData: UpdateContentDto): Promise<Content> {
    return await this.contentService.updateContent(id, updateData);
  }

  @Delete(':id')
  async deleteContent(@Param('id') id: number): Promise<string> {
    return await this.contentService.deleteContent(id);
  }
}
