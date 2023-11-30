import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Inject,
  UseGuards,
  UseInterceptors,
  Body,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/infrastructure/entities/user.entity';
import { JwtAuthGuard } from 'src/infrastructure/guards/auth.guard';
import { CurrentUser } from '../../infrastructure/common/decorators/currentUser.decorator';
import { Paginate } from 'src/infrastructure/common/dto/paginate';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usercase-proxy/usecase-proxy';
import { GetSentRequestsUseCase } from 'src/application/use-cases/friend/getSentRequests.usecase';
import { PaginationDto } from 'src/infrastructure/common/dto/pagination.dto';
import { GetReceivedRequestsUseCase } from 'src/application/use-cases/friend/getReceivedFriendRequests';
import { CreateFriendRequestUseCase } from 'src/application/use-cases/friend/createFriendRequest.usecase';
import { FriendRequest } from 'src/infrastructure/entities/friendRequest.entity';
import { UpdateFriendRequestUseCase } from 'src/application/use-cases/friend/updateFriendRequest.usecase';
import { UpdateFriendRequestDto } from './dto/updateFriendRequest.dto';
import { DeleteFriendRequestUseCase } from 'src/application/use-cases/friend/deleteFriendRequest.usecase';
import { GetFriendsUseCase } from 'src/application/use-cases/friend/getFriends.usecase';

@ApiTags('friends')
@ApiBearerAuth()
@Controller('friends')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class FriendController {
  @Inject(UsecaseProxyModule.CREATE_FRIEND_REQUEST_USE_CASE)
  private readonly createRequestUsecaseProxy: UseCaseProxy<CreateFriendRequestUseCase>;

  @Inject(UsecaseProxyModule.UPDATE_FRIEND_REQUEST_USE_CASE)
  private readonly updateRequestUsecaseProxy: UseCaseProxy<UpdateFriendRequestUseCase>;

  @Inject(UsecaseProxyModule.DELETE_FRIEND_REQUEST_USE_CASE)
  private readonly deleteRequestUsecaseProxy: UseCaseProxy<DeleteFriendRequestUseCase>;

  @Inject(UsecaseProxyModule.SENT_FRIEND_REQUESTS_USE_CASE)
  private readonly getSentRequestUsecaseProxy: UseCaseProxy<GetSentRequestsUseCase>;

  @Inject(UsecaseProxyModule.RECEIVED_FRIEND_REQUESTS_USE_CASE)
  private readonly getReceivedRequestUsecaseProxy: UseCaseProxy<GetReceivedRequestsUseCase>;

  @Inject(UsecaseProxyModule.GET_FRIENDS_USE_CASE)
  private readonly getFriendsUsecaseProxy: UseCaseProxy<GetFriendsUseCase>;

  @Post()
  async createFriendRequest(
    @CurrentUser() user: User,
    @Param('receiverId') receiverId: number,
  ): Promise<FriendRequest> {
    return this.createRequestUsecaseProxy
      .getInstance()
      .execute(user.id, receiverId);
  }

  @Put('/:id')
  async updateFriendRequest(
    @Param('id') id: number,
    @Body() input: UpdateFriendRequestDto,
  ): Promise<FriendRequest> {
    return this.updateRequestUsecaseProxy
      .getInstance()
      .execute(id, input.status);
  }

  @Get()
  async getFriends(
    @CurrentUser() user: User,
    @Query()
    query: PaginationDto,
  ): Promise<Paginate<User>> {
    return this.getFriendsUsecaseProxy.getInstance().execute(user.id, query);
  }

  @Get('/sent-requests')
  async getSentFriendRequests(
    @CurrentUser() user: User,
    @Query()
    query: PaginationDto,
  ): Promise<Paginate<User>> {
    return this.getSentRequestUsecaseProxy
      .getInstance()
      .execute(user.id, query);
  }

  @Get('/received-requests')
  async getReceivedFriendRequests(
    @CurrentUser() user: User,
    @Query()
    query: PaginationDto,
  ): Promise<Paginate<User>> {
    return this.getReceivedRequestUsecaseProxy
      .getInstance()
      .execute(user.id, query);
  }

  @Delete('/:id')
  async deleteFriendRequest(
    @Param('id') id: number,
  ): Promise<Record<string, boolean>> {
    return this.deleteRequestUsecaseProxy.getInstance().execute(id);
  }
}
