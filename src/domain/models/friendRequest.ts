import { FriendRequestStatus } from '../enums/friendRequestStatus';
import { UserModel } from './user';

export class FriendRequestModel {
  id: number;
  status: FriendRequestStatus;
  senderId: number;
  sender: UserModel;
  receiverId: number;
  receiver: UserModel;
  createdAt: Date;
  updatedAt: Date;
}
