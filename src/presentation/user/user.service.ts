import { Paginate } from './../../domain/common/paginate';
import { Inject, Injectable } from '@nestjs/common';
import { DeleteUserUseCase } from 'src/application/use-cases/user/deleteUser.usecase';
import { FindUserByIdUseCase } from 'src/application/use-cases/user/findById.usecase';
import { GetAllUserUseCase } from 'src/application/use-cases/user/getAllUsers.usecase';
import { UpdateUserUseCase } from 'src/application/use-cases/user/updateUser.usecse';
import { GetAllUsersQuery } from 'src/domain/dto/getAllUsers.dto';
import { User } from 'src/infrastructure/entities/user.entity';
import { UseCaseProxy } from 'src/infrastructure/usercase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usecase-proxy.module';

@Injectable()
export class UserService {
  @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
  private readonly getUserUsecaseProxy: UseCaseProxy<GetAllUserUseCase>;

  @Inject(UsecaseProxyModule.UPDATE_USER_USE_CASE)
  private readonly updateUserUsecaseProxy: UseCaseProxy<UpdateUserUseCase>;

  @Inject(UsecaseProxyModule.FIND_BY_ID_USER_USE_CASE)
  private readonly findByIdUserUsecaseProxy: UseCaseProxy<FindUserByIdUseCase>;

  @Inject(UsecaseProxyModule.DELETE_USER_USE_CASE)
  private readonly deleteUserUsecaseProxy: UseCaseProxy<DeleteUserUseCase>;

  async updateUser(id: number, input: Partial<User>): Promise<User> {
    return await this.updateUserUsecaseProxy.getInstance().execute(id, input);
  }

  async getAllUsers(query: GetAllUsersQuery): Promise<Paginate<User>> {
    return await this.getUserUsecaseProxy.getInstance().execute(query);
  }

  async getUser(id: number): Promise<User> {
    return await this.findByIdUserUsecaseProxy.getInstance().execute(id);
  }

  async deleteUser(id: number): Promise<User> {
    return await this.deleteUserUsecaseProxy.getInstance().execute(id);
  }
}
