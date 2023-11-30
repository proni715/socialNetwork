import { Paginate } from './../../../infrastructure/common/dto/paginate';
import { PaginationQuery } from 'src/domain/common/pagination.dto';
import { PostModel } from 'src/domain/models/post';
import { PostRepository } from 'src/domain/repositories/post.repository';

export class GetUserPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(
    userId: number,
    query: Partial<PaginationQuery>,
  ): Promise<Paginate<PostModel>> {
    return this.postRepository.getUserPosts(userId, query);
  }
}
