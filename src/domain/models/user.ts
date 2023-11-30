import { FriendRequestModel } from './friendRequest';
import { PostModel } from './post';

export class UserModel {
  id: number;
  email: string;
  name: string;
  password: string;
  sentRequests: FriendRequestModel[];
  receivedRequests: FriendRequestModel[];
  posts: PostModel[];
  createdAt: Date;
  updatedAt: Date;
}
