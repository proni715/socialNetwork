import { JwtModule, JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from 'src/application/use-cases/user/createUser.usecase';
import { DynamicModule, Module } from '@nestjs/common';
import { GetAllUserUseCase } from 'src/application/use-cases/user/getAllUsers.usecase';
import { UserRepositoryOrm } from '../repositories/user.repository';
import { UseCaseProxy } from './usecase-proxy';
import { EnvironmentConfigModule } from '../config/config.module';
import { RepositoriesModule } from '../repositories/repository.module';
import { FindUserByEmailUseCase } from 'src/application/use-cases/user/findUserByEmail.usecase';
import { ValidateUserUseCase } from 'src/application/use-cases/user/validateUser.usecase';
import { ValidatePasswordUseCase } from 'src/application/use-cases/user/validatePassword.usecase';
import { GenerateTokenUseCase } from 'src/application/use-cases/auth/generateToken.usecase';
import { EnvironmentConfigService } from '../config/config.service';
import { UpdateUserUseCase } from 'src/application/use-cases/user/updateUser.usecse';
import { FindUserByIdUseCase } from 'src/application/use-cases/user/findById.usecase';
import { DeleteUserUseCase } from 'src/application/use-cases/user/deleteUser.usecase';

@Module({
  imports: [
    EnvironmentConfigModule,
    RepositoriesModule,
    JwtModule.registerAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService) => ({
        secret: config.getJwtKey(),
        signOptions: { expiresIn: config.getJwtExpires() },
      }),
    }),
  ],
})
export class UsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';
  static UPDATE_USER_USE_CASE = 'updateUserUsecaseProxy';
  static DELETE_USER_USE_CASE = 'deleteUserUsecaseProxy';
  static FIND_BY_EMAIL_USER_USE_CASE = 'findByEmailUserUsecaseProxy';
  static FIND_BY_ID_USER_USE_CASE = 'findByIdUserUsecaseProxy';
  static VALIDATE_USER_USE_CASE = 'validateUserProxy';
  static VALIDATE_PASSWORD_USE_CASE = 'validatePasswordProxy';
  static GENERATE_TOKEN_USE_CASE = 'generateTokenUseCaseProxy';
  static VALIDATE_TOKEN_USE_CASE = 'validateTokenUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new CreateUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.UPDATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new UpdateUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.DELETE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new DeleteUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.FIND_BY_EMAIL_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new FindUserByEmailUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.FIND_BY_ID_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new FindUserByIdUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.VALIDATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new ValidateUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.VALIDATE_PASSWORD_USE_CASE,
          useFactory: () => new UseCaseProxy(new ValidatePasswordUseCase()),
        },
        {
          inject: [JwtService],
          provide: UsecaseProxyModule.GENERATE_TOKEN_USE_CASE,
          useFactory: (jwtService: JwtService) =>
            new UseCaseProxy(new GenerateTokenUseCase(jwtService)),
        },
      ],
      exports: [
        UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
        UsecaseProxyModule.CREATE_USER_USE_CASE,
        UsecaseProxyModule.UPDATE_USER_USE_CASE,
        UsecaseProxyModule.DELETE_USER_USE_CASE,
        UsecaseProxyModule.FIND_BY_EMAIL_USER_USE_CASE,
        UsecaseProxyModule.VALIDATE_USER_USE_CASE,
        UsecaseProxyModule.VALIDATE_PASSWORD_USE_CASE,
        UsecaseProxyModule.GENERATE_TOKEN_USE_CASE,
        UsecaseProxyModule.FIND_BY_ID_USER_USE_CASE,
      ],
    };
  }
}
