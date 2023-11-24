import { Paginate } from '../common/paginate';
import { UserModel } from '../models/user';
import { PaginationQuery } from '../common/pagination.dto';
import { FriendRequestModel } from '../models/friendRequest';
import { FriendRequestStatus } from '../enums/friendRequestStatus';
import { DeepPartial } from 'typeorm';
import { User } from 'src/infrastructure/entities/user.entity';

export interface FriendRequestRepository {
  createFriendRequest(
    senderId: number,
    receiverId: number,
  ): Promise<FriendRequestModel>;
  updateFriendRequest(
    id: number,
    status: FriendRequestStatus,
  ): Promise<FriendRequestModel>;
  //@todo -- modify query
  getSentRequests(
    userId: number,
    query: PaginationQuery,
  ): Promise<Paginate<UserModel>>;
  getReceivedRequests(
    userId: number,
    query: PaginationQuery,
  ): Promise<Paginate<UserModel>>;
  getFriends(
    userId: number,
    query: PaginationQuery,
  ): Promise<Paginate<UserModel>>;

  deleteFriendRequest(id: number);
}
