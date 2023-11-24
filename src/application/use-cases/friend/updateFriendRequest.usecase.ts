import { FriendRequestStatus } from 'src/domain/enums/friendRequestStatus';
import { FriendRequestModel } from 'src/domain/models/friendRequest';
import { FriendRequestRepository } from 'src/domain/repositories/friendRequest.repository';

export class UpdateFriendRequestUseCase {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async execute(
    id: number,
    status: FriendRequestStatus,
  ): Promise<FriendRequestModel> {
    return this.friendRequestRepository.updateFriendRequest(id, status);
  }
}
