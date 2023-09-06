import { Injectable } from "@nestjs/common";
import { Content } from "./content.entity";
import { DataSource, Repository } from "typeorm";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";

@Injectable()
export class ContentRepository extends Repository<Content> {
  constructor(private dataSource: DataSource) {
    super(Content, dataSource.createEntityManager());
  }

  async findAllContents(): Promise<Content[]> {
    return await this.find();
  }

  async findOneContent(id: number): Promise<Content> {
    return await this.findOne({
      where: { id },
    });
  }

  async findOneContentWithAllComment(id: number): Promise<Content> {
    return await this.findOne({
      where: { id },
      relations: ['comment'],
    });
  }

  async findOneContentOfUserName(user_name: string): Promise<Content> {
    return await this.findOne({
      where: { user_name },
    });
  }

  async searchTitleContent(searchKeyword: string): Promise<Content[]> {
    const searchTitle = await this.dataSource
    .createQueryBuilder(Content, 'content')
    .where('content.title LIKE :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
    .getMany();
    return searchTitle;
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

  async updateContent(id: number, updateData: UpdateContentDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Content, id, updateData); 
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteContent(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager
      .createQueryBuilder(Content, 'content')
      .delete()
      .from(Content)
      .where("id = :id", { id })
      .execute();
      
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
