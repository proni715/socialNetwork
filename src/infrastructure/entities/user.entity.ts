import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FriendRequest } from './friendRequest.entity';
import { UserModel } from 'src/domain/models/user';
import { Post } from './post.entity';

@Entity('users')
export class User implements UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  name: string;

  @Exclude()
  @Column('varchar')
  password: string;

  //Relations\\
  @OneToMany(() => FriendRequest, (request) => request.sender)
  sentRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (request) => request.receiver)
  receivedRequests: FriendRequest[];

  @OneToMany(() => Post, (request) => request.owner)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
