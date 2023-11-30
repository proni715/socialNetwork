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
import { FriendRequestRepositoryOrm } from '../repositories/friend.repository';
import { GetSentRequestsUseCase } from 'src/application/use-cases/friend/getSentRequests.usecase';
import { GetReceivedRequestsUseCase } from 'src/application/use-cases/friend/getReceivedFriendRequests';
import { GetFriendsUseCase } from 'src/application/use-cases/friend/getFriends.usecase';
import { CreateFriendRequestUseCase } from 'src/application/use-cases/friend/createFriendRequest.usecase';
import { UpdateFriendRequestUseCase } from 'src/application/use-cases/friend/updateFriendRequest.usecase';
import { DeleteFriendRequestUseCase } from 'src/application/use-cases/friend/deleteFriendRequest.usecase';
import { PostRepositoryOrm } from '../repositories/post.repository';
import { CreatePostUseCase } from 'src/application/use-cases/post/createPost.usecase';
import { UpdatePostUseCase } from 'src/application/use-cases/post/updatePost.usecase';
import { GetPostUseCase } from 'src/application/use-cases/post/getPost.usecase copy';
import { DeletePostUseCase } from 'src/application/use-cases/post/deletePost.usecase';
import { GetUserPostsUseCase } from 'src/application/use-cases/post/getUserPosts.usecase';
import { GetRecomendedPostsUseCase } from 'src/application/use-cases/post/getRecomendedPosts.usecase';

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
  static CREATE_FRIEND_REQUEST_USE_CASE = 'createFriendRequesttUseCaseProxy';
  static UPDATE_FRIEND_REQUEST_USE_CASE = 'updateFriendRequesttUseCaseProxy';
  static DELETE_FRIEND_REQUEST_USE_CASE = 'updateFriendRequesttUseCaseProxy';
  static SENT_FRIEND_REQUESTS_USE_CASE = 'sentFriendRequestsUseCaseProxy';
  static RECEIVED_FRIEND_REQUESTS_USE_CASE =
    'receivedFriendRequestsUseCaseProxy';
  static GET_FRIENDS_USE_CASE = 'getFriendsUseCaseProxy';
  static CREATE_POST_USE_CASE = 'createPostUseCaseProxy';
  static UPDATE_POST_USE_CASE = 'updatePostUseCaseProxy';
  static GET_POST_USE_CASE = 'getPostUseCaseProxy';
  static DELETE_POST_USE_CASE = 'deletePostUseCaseProxy';
  static GET_USER_POSTS_USE_CASE = 'getUserPostsUseCaseProxy';
  static GET_RECOMENDED_POSTS_USE_CASE = 'getRecomendedPostsUseCaseProxy';

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
        {
          inject: [FriendRequestRepositoryOrm],
          provide: UsecaseProxyModule.SENT_FRIEND_REQUESTS_USE_CASE,
          useFactory: (friendRequestRepository: FriendRequestRepositoryOrm) =>
            new UseCaseProxy(
              new GetSentRequestsUseCase(friendRequestRepository),
            ),
        },
        {
          inject: [FriendRequestRepositoryOrm],
          provide: UsecaseProxyModule.RECEIVED_FRIEND_REQUESTS_USE_CASE,
          useFactory: (friendRequestRepository: FriendRequestRepositoryOrm) =>
            new UseCaseProxy(
              new GetReceivedRequestsUseCase(friendRequestRepository),
            ),
        },
        {
          inject: [FriendRequestRepositoryOrm],
          provide: UsecaseProxyModule.GET_FRIENDS_USE_CASE,
          useFactory: (friendRequestRepository: FriendRequestRepositoryOrm) =>
            new UseCaseProxy(new GetFriendsUseCase(friendRequestRepository)),
        },
        {
          inject: [FriendRequestRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_FRIEND_REQUEST_USE_CASE,
          useFactory: (friendRequestRepository: FriendRequestRepositoryOrm) =>
            new UseCaseProxy(
              new CreateFriendRequestUseCase(friendRequestRepository),
            ),
        },
        {
          inject: [FriendRequestRepositoryOrm],
          provide: UsecaseProxyModule.UPDATE_FRIEND_REQUEST_USE_CASE,
          useFactory: (friendRequestRepository: FriendRequestRepositoryOrm) =>
            new UseCaseProxy(
              new UpdateFriendRequestUseCase(friendRequestRepository),
            ),
        },
        {
          inject: [FriendRequestRepositoryOrm],
          provide: UsecaseProxyModule.DELETE_FRIEND_REQUEST_USE_CASE,
          useFactory: (friendRequestRepository: FriendRequestRepositoryOrm) =>
            new UseCaseProxy(
              new DeleteFriendRequestUseCase(friendRequestRepository),
            ),
        },
        {
          inject: [PostRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_POST_USE_CASE,
          useFactory: (postRepository: PostRepositoryOrm) =>
            new UseCaseProxy(new CreatePostUseCase(postRepository)),
        },
        {
          inject: [PostRepositoryOrm],
          provide: UsecaseProxyModule.UPDATE_POST_USE_CASE,
          useFactory: (postRepository: PostRepositoryOrm) =>
            new UseCaseProxy(new UpdatePostUseCase(postRepository)),
        },
        {
          inject: [PostRepositoryOrm],
          provide: UsecaseProxyModule.GET_POST_USE_CASE,
          useFactory: (postRepository: PostRepositoryOrm) =>
            new UseCaseProxy(new GetPostUseCase(postRepository)),
        },
        {
          inject: [PostRepositoryOrm],
          provide: UsecaseProxyModule.DELETE_POST_USE_CASE,
          useFactory: (postRepository: PostRepositoryOrm) =>
            new UseCaseProxy(new DeletePostUseCase(postRepository)),
        },
        {
          inject: [PostRepositoryOrm],
          provide: UsecaseProxyModule.GET_USER_POSTS_USE_CASE,
          useFactory: (postRepository: PostRepositoryOrm) =>
            new UseCaseProxy(new GetUserPostsUseCase(postRepository)),
        },
        {
          inject: [PostRepositoryOrm],
          provide: UsecaseProxyModule.GET_RECOMENDED_POSTS_USE_CASE,
          useFactory: (postRepository: PostRepositoryOrm) =>
            new UseCaseProxy(new GetRecomendedPostsUseCase(postRepository)),
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
        UsecaseProxyModule.CREATE_FRIEND_REQUEST_USE_CASE,
        UsecaseProxyModule.UPDATE_FRIEND_REQUEST_USE_CASE,
        UsecaseProxyModule.DELETE_FRIEND_REQUEST_USE_CASE,
        UsecaseProxyModule.GET_FRIENDS_USE_CASE,
        UsecaseProxyModule.SENT_FRIEND_REQUESTS_USE_CASE,
        UsecaseProxyModule.RECEIVED_FRIEND_REQUESTS_USE_CASE,
        UsecaseProxyModule.CREATE_POST_USE_CASE,
        UsecaseProxyModule.UPDATE_POST_USE_CASE,
        UsecaseProxyModule.GET_POST_USE_CASE,
        UsecaseProxyModule.DELETE_POST_USE_CASE,
        UsecaseProxyModule.GET_USER_POSTS_USE_CASE,
        UsecaseProxyModule.GET_RECOMENDED_POSTS_USE_CASE,
      ],
    };
  }
}
