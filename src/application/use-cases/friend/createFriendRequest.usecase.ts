import { FriendRequestModel } from 'src/domain/models/friendRequest';
import { UserModel } from 'src/domain/models/user';
import { FriendRequestRepository } from 'src/domain/repositories/friendRequest.repository';

export class CreateFriendRequestUseCase {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async execute(
    senderId: number,
    receiverId: number,
  ): Promise<FriendRequestModel> {
    return this.friendRequestRepository.createFriendRequest(
      senderId,
      receiverId,
    );
  }
}
