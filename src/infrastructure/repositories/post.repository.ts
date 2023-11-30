import { Paginate } from '../common/dto/paginate';
import { Injectable } from '@nestjs/common';
import { DeepPartial, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Post } from '../entities/post.entity';
import { PostRepository } from 'src/domain/repositories/post.repository';

@Injectable()
export class PostRepositoryOrm implements PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(input: DeepPartial<Post>): Promise<Post> {
    return this.postRepository.save(input);
  }

  async updatePost(id: number, input: DeepPartial<Post>): Promise<Post> {
    await this.postRepository.update(id, input);
    return this.postRepository.findOne({ where: { id } });
  }

  async getPost(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async deletePost(id: number) {
    return this.postRepository.delete(id);
  }

  async getUserPosts(
    userId: number,
    query: PaginationDto,
  ): Promise<Paginate<Post>> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const order = query.order || 'DESC';

    const [data, count] = await this.postRepository.findAndCount({
      where: { owner: { id: userId } },
      relations: { owner: true },
      order: { createdAt: order },
      take: take,
      skip: skip,
    });

    return { data, count };
  }

  async getRecomendedPosts(
    userIds: number[],
    query: PaginationDto,
  ): Promise<Paginate<Post>> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const order = query.order || 'DESC';

    const [data, count] = await this.postRepository.findAndCount({
      where: { owner: { id: In(userIds) } },
      relations: { owner: true },
      order: { createdAt: order },
      take: take,
      skip: skip,
    });

    return { data, count };
  }
}
