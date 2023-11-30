import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { PostModel } from 'src/domain/models/post';
import { User } from './user.entity';

@Entity('posts')
export class Post implements PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column('text', { array: true, default: [] })
  attachments: string[];

  //Relations\\
  @RelationId('owner')
  ownerId: number;

  @ManyToOne(() => User, (user) => user.posts)
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
