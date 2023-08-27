import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    UserModule,
  ],
  controllers: [ContentController],
  providers: [
    ContentService,
    ContentRepository,
  ],
  exports: [
    ContentService,
    ContentRepository,
  ]
})
export class ContentModule {}
