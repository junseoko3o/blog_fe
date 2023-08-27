import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  content_id: number;

  @Column()
  created_user_id: number;

  @Column()
  updated_user_id: number;
}
