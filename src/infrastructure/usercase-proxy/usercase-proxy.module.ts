import { CreateUserUseCase } from 'src/application/use-cases/user/createUser.usecase';
import { DynamicModule, Module } from '@nestjs/common';
import { GetAllUserUseCase } from 'src/application/use-cases/user/getAllUsers.usecase';
import { UserRepositoryOrm } from '../repositories/user.repository';
import { UseCaseProxy } from './usecase-proxy';
import { EnvironmentConfigModule } from '../config/config.module';
import { RepositoriesModule } from '../repositories/repository.module';
import { FindUserByEmailUseCase } from 'src/application/use-cases/user/findUserByEmail.usecase';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';
  static FIND_BY_EMAIL_USER_USE_CASE = 'findByEmailUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new CreateUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.FIND_BY_EMAIL_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new FindUserByEmailUseCase(userRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
        UsecaseProxyModule.CREATE_USER_USE_CASE,
        UsecaseProxyModule.FIND_BY_EMAIL_USER_USE_CASE,
      ],
    };
  }
}
