import { Injectable } from "@nestjs/common";
import { Content } from "./content.entity";
import { DataSource, Repository } from "typeorm";
import { CreateContentDto } from "./dto/create-content.dto";

@Injectable()
export class ContentsRepository extends Repository<Content> {
  constructor(private dataSource: DataSource) {
    super(Content, dataSource.createEntityManager());
  }

  async findAllContents() {
    return await this.find();
  }

  async findOneContent(id: number) {
    return await this.findOne({
      where: { id },
    });
  }

  async findOneContentOfUserName(user_name: string) {
    return await this.findOne({
      where: { user_name },
    });
  }

  async createContent(createData: CreateContentDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createData); 
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
