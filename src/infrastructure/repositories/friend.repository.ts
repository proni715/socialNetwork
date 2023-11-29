import { FriendRequestRepository } from 'src/domain/repositories/friendRequest.repository';
import { Paginate } from '../common/dto/paginate';
import { Injectable } from '@nestjs/common';
import { DeepPartial, Like, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from '../entities/friendRequest.entity';
import { FriendRequestStatus } from 'src/domain/enums/friendRequestStatus';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class FriendRequestRepositoryOrm implements FriendRequestRepository {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
  ) {}

  async createFriendRequest(
    senderId: number,
    receiverId: number,
  ): Promise<FriendRequest> {
    return await this.friendRequestRepository.save({
      senderId,
      receiverId,
      status: FriendRequestStatus.Pending,
    });
  }

  async updateFriendRequest(
    id: number,
    status: FriendRequestStatus,
  ): Promise<FriendRequest> {
    this.friendRequestRepository.update(id, { status });
    return this.friendRequestRepository.findOne({ where: { id } });
  }

  async getSentRequests(
    userId: number,
    query: PaginationDto,
  ): Promise<Paginate<User>> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const order = query.order || 'DESC';

    const [data, count] = await this.friendRequestRepository.findAndCount({
      where: { sender: { id: userId }, status: FriendRequestStatus.Pending },
      order: { createdAt: order },
      relations: { sender: true, receiver: true },
      take: take,
      skip: skip,
    });

    const result = data.map((request) => request.receiver);

    return { data: result, count };
  }

  async getReceivedRequests(
    userId: number,
    query: PaginationDto,
  ): Promise<Paginate<User>> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const order = query.order || 'DESC';

    const [data, count] = await this.friendRequestRepository.findAndCount({
      where: { receiver: { id: userId }, status: FriendRequestStatus.Pending },
      order: { createdAt: order },
      relations: { sender: true, receiver: true },
      take: take,
      skip: skip,
    });

    const result = data.map((request) => request.sender);

    return { data: result, count };
  }

  async getFriends(
    userId: number,
    query: PaginationDto,
  ): Promise<Paginate<User>> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const order = query.order || 'DESC';

    const [data, count] = await this.friendRequestRepository.findAndCount({
      where: [
        { receiver: { id: userId }, status: FriendRequestStatus.Accepted },
        { sender: { id: userId }, status: FriendRequestStatus.Accepted },
      ],
      relations: { sender: true, receiver: true },
      order: { createdAt: order },
      take: take,
      skip: skip,
    });

    const result = data.map((request) =>
      request.receiver.id === userId ? request.sender : request.receiver,
    );

    return { data: result, count };
  }

  async deleteFriendRequest(id: number) {
    return this.friendRequestRepository.delete(id);
  }
}
