import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
  ],
  controllers: [ContentController],
  providers: [
    ContentService,
    ContentRepository,
    UserRepository,
  ]
})
export class ContentModule {}
