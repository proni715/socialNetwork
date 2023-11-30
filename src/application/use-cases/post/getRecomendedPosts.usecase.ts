import { Paginate } from '../../../infrastructure/common/dto/paginate';
import { PaginationQuery } from 'src/domain/common/pagination.dto';
import { PostModel } from 'src/domain/models/post';
import { PostRepository } from 'src/domain/repositories/post.repository';

export class GetRecomendedPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(
    userIds: number[],
    query: Partial<PaginationQuery>,
  ): Promise<Paginate<PostModel>> {
    return this.postRepository.getRecomendedPosts(userIds, query);
  }
}
