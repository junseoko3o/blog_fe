import { Injectable } from "@nestjs/common";
import { Content } from "./content.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ContentsRepository extends Repository<Content> {
  constructor(private dataSource: DataSource) {
    super(Content, dataSource.createEntityManager());
  }

  async findAllContents() {
    return await this.find();
  }
}
