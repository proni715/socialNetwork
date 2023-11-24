import { FriendRequestModel } from './friendRequest';

export class UserModel {
  id: number;
  email: string;
  name: string;
  password: string;
  sentRequests: FriendRequestModel[];
  receivedRequests: FriendRequestModel[];
  createdAt: Date;
  updatedAt: Date;
}
