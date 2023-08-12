import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { ContentsRepository } from './contents.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
  ],
  controllers: [ContentsController],
  providers: [
    ContentsService,
    ContentsRepository,
  ]
})
export class ContentsModule {}
