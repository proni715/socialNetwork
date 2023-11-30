import { CreatePostUseCase } from 'src/application/use-cases/post/createPost.usecase';
import { Paginate } from '../../domain/common/paginate';
import { Inject, Injectable } from '@nestjs/common';
import { Post } from 'src/infrastructure/entities/post.entity';
import { UseCaseProxy } from 'src/infrastructure/usercase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usecase-proxy.module';
import { UpdatePostUseCase } from 'src/application/use-cases/post/updatePost.usecase';
import { GetPostUseCase } from 'src/application/use-cases/post/getPost.usecase copy';
import { DeletePostUseCase } from 'src/application/use-cases/post/deletePost.usecase';
import { PaginationDto } from 'src/infrastructure/common/dto/pagination.dto';
import { GetUserPostsUseCase } from 'src/application/use-cases/post/getUserPosts.usecase';
import { GetRecomendedPostsUseCase } from 'src/application/use-cases/post/getRecomendedPosts.usecase';
import { GetFriendsUseCase } from 'src/application/use-cases/friend/getFriends.usecase';

@Injectable()
export class PostService {
  @Inject(UsecaseProxyModule.CREATE_POST_USE_CASE)
  private readonly createPostUsecaseProxy: UseCaseProxy<CreatePostUseCase>;

  @Inject(UsecaseProxyModule.UPDATE_POST_USE_CASE)
  private readonly updatePostUsecaseProxy: UseCaseProxy<UpdatePostUseCase>;

  @Inject(UsecaseProxyModule.GET_POST_USE_CASE)
  private readonly getPostUsecaseProxy: UseCaseProxy<GetPostUseCase>;

  @Inject(UsecaseProxyModule.DELETE_POST_USE_CASE)
  private readonly deletePostUsecaseProxy: UseCaseProxy<DeletePostUseCase>;

  @Inject(UsecaseProxyModule.GET_USER_POSTS_USE_CASE)
  private readonly getUserPostsUsecaseProxy: UseCaseProxy<GetUserPostsUseCase>;

  @Inject(UsecaseProxyModule.GET_RECOMENDED_POSTS_USE_CASE)
  private readonly getRecomendedPostsUsecaseProxy: UseCaseProxy<GetRecomendedPostsUseCase>;

  @Inject(UsecaseProxyModule.GET_FRIENDS_USE_CASE)
  private readonly getFriendsUsecaseProxy: UseCaseProxy<GetFriendsUseCase>;

  async createPost(input: Partial<Post>): Promise<Post> {
    return this.createPostUsecaseProxy.getInstance().execute(input);
  }

  async updatePost(id: number, input: Partial<Post>): Promise<Post> {
    return this.updatePostUsecaseProxy.getInstance().execute(id, input);
  }

  async getPost(id: number): Promise<Post> {
    return this.getPostUsecaseProxy.getInstance().execute(id);
  }

  async getUserPosts(
    userId: number,
    query: PaginationDto,
  ): Promise<Paginate<Post>> {
    return this.getUserPostsUsecaseProxy.getInstance().execute(userId, query);
  }

  async getRecomendedPosts(
    userId: number,
    query: PaginationDto,
  ): Promise<Paginate<Post>> {
    const friendsIds = (
      await this.getFriendsUsecaseProxy
        .getInstance()
        .execute(userId, { take: 0, skip: 0 })
    ).data // get all friends without pagination
      .map((friend) => friend.id);

    return this.getRecomendedPostsUsecaseProxy
      .getInstance()
      .execute(friendsIds, query);
  }

  async deletePost(id: number) {
    return this.deletePostUsecaseProxy.getInstance().execute(id);
  }
}
