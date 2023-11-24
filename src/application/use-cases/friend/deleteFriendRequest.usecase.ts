import { FriendRequestRepository } from 'src/domain/repositories/friendRequest.repository';

export class UpdateFriendRequestUseCase {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async execute(id: number) {
    return this.friendRequestRepository.deleteFriendRequest(id);
  }
}
