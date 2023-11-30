import { PostModel } from 'src/domain/models/post';
import { PostRepository } from 'src/domain/repositories/post.repository';

export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(input: Partial<PostModel>): Promise<PostModel> {
    return this.postRepository.createPost(input);
  }
}
