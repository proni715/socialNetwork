import {
  ClassSerializerInterceptor,
  Controller,
  Get,
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
import { CurrentUser } from './decorators/currentUser.decorator';
import { Paginate } from 'src/infrastructure/common/dto/paginate';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usercase-proxy/usecase-proxy';
import { GetSentRequestsUseCase } from 'src/application/use-cases/friend/getSentRequests.usecase';
import { PaginationDto } from 'src/infrastructure/common/dto/pagination.dto';

@ApiTags('friends')
@Controller('friends')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class FriendController {
  @Inject(UsecaseProxyModule.SENT_FRIEND_REQUESTS_USE_CASE)
  private readonly getSentRequestUsecaseProxy: UseCaseProxy<GetSentRequestsUseCase>;

  @ApiBearerAuth()
  @Get()
  async getSentFriendRequests(
    @CurrentUser() user: User,
    @Query()
    query: PaginationDto,
  ): Promise<Paginate<User>> {
    return this.getSentRequestUsecaseProxy
      .getInstance()
      .execute(user.id, query);
  }
}
