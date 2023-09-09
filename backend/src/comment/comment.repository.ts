import { DataSource, Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findAllComment() {
    return await this.find();
  }

  async findOneComment(id: number) {
    return await this.findOne({
      where: { id },
    });
  }

  async createComment(createData: CreateCommentDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createData);
      await queryRunner.commitTransaction();
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateComment(id: number, updateData: UpdateCommentDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Comment, id, updateData);
      await queryRunner.commitTransaction();
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteComment(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager
      .createQueryBuilder(Comment, 'comment')
      .delete()
      .from(Comment)
      .where("id = :id", { id })
      .execute()
      
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
