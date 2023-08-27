import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { UserModule } from 'src/user/user.module';
import { ContentModule } from 'src/content/content.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    UserModule,
    ContentModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository,
  ],
  exports: [
    CommentService,
    CommentRepository,
  ]
})
export class CommentModule {}
