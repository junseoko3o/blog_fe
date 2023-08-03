import { User } from "src/user/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column({ nullable: true })
  created_user_id: number;

  @Column({ nullable: true })
  updated_user_id: number;
  
  @ManyToOne(() => User, (user) => user.content, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'created_user_id' }, { name: 'updated_user_id' }])
  user: User;
}
