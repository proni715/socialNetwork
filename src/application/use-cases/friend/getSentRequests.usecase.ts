import { Paginate } from 'src/domain/common/paginate';
import { PaginationQuery } from 'src/domain/common/pagination.dto';
import { UserModel } from 'src/domain/models/user';
import { FriendRequestRepository } from 'src/domain/repositories/friendRequest.repository';

export class GetSentRequestsUseCase {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async execute(
    userId: number,
    query: PaginationQuery,
  ): Promise<Paginate<UserModel>> {
    return this.friendRequestRepository.getSentRequests(userId, query);
  }
}
