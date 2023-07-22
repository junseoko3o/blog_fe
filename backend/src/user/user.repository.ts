import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CustomRepository } from "src/common/custom/custom-typeorm.decorator";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.manager)
  }

  async findAllUser() {
    return await this.find();
  }

  async findOneUser(id: number) {
    return await this.findOne({
      where: { id },
    });
  }

  async findOneUserEmail(user_email: string) {
    return await this.findOne({
      where: { user_email },
    });
  }

  async createUser(createData: CreateUserDto) {
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

  async updateUser(id: number, updateData: UpdateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(User, id, updateData);
      await queryRunner.commitTransaction();
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUser(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager
      .createQueryBuilder(User, 'user')
      .delete()
      .from(User)
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