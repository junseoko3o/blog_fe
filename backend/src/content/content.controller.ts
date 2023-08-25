import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './content.entity';
import { Public } from 'src/user/auth/public.decorator';

@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @Get('list')
  @Public()
  async findAllContents(): Promise<Content[]> {
    return await this.contentService.findAllContents();
  }

  @Get(':id')
  async findOneContent(@Param('id') id: number): Promise<Content> {
    return await this.contentService.findOneContent(id);
  }

  @Get('search')
  async searchTitleContent(@Query('search') searchKeyword: string): Promise<Content[]> {
    return await this.contentService.searchTitleContent(searchKeyword);
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
