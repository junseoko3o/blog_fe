import { Content } from "src/content/content.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_email: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column({ type:'timestamp', precision: 6 , nullable: true })
  login_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Content, (content) => content.user, { cascade: true })
  content: Content[];
}
