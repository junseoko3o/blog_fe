import { Comment } from "src/comment/comment.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  created_user_id: number;

  @Column({ nullable: true })
  updated_user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  @ManyToOne(() => User, (user) => user.content, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'created_user_id' }, { name: 'updated_user_id' }])
  user: User;

  @OneToMany(() => Comment, (comment) => comment.content, { cascade: true })
  comment: Comment[];
}
