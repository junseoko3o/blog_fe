import { DataSource, Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { Injectable } from "@nestjs/common";

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
}
