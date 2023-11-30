import { PostModel } from 'src/domain/models/post';
import { PostRepository } from 'src/domain/repositories/post.repository';

export class GetPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number): Promise<PostModel> {
    return this.postRepository.getPost(id);
  }
}
