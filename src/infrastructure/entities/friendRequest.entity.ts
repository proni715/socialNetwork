import { FriendRequestStatus } from 'src/domain/enums/friendRequestStatus';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { FriendRequestModel } from 'src/domain/models/friendRequest';

@Entity('friendRequest')
export class FriendRequest implements FriendRequestModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  status: FriendRequestStatus;

  //Relations\\
  @RelationId('sender')
  senderId: number;

  @ManyToOne(() => User, (user) => user.sentRequests)
  sender: User;

  @RelationId('receiver')
  receiverId: number;

  @ManyToOne(() => User, (user) => user.receivedRequests)
  receiver: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
