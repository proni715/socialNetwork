import { PostModel } from 'src/domain/models/post';
import { PostRepository } from 'src/domain/repositories/post.repository';

export class UpdatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number, input: Partial<PostModel>): Promise<PostModel> {
    return this.postRepository.updatePost(id, input);
  }
}
