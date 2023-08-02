import { Injectable } from "@nestjs/common";
import { Content } from "./content.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<Content> {
  constructor(private dataSource: DataSource) {
    super(Content, dataSource.createEntityManager());
  }
}
