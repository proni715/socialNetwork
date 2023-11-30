import { Paginate } from './../common/paginate';
import { PostModel } from '../models/post';
import { PaginationQuery } from '../common/pagination.dto';

export interface PostRepository {
  createPost(input: Partial<PostModel>): Promise<PostModel>;
  updatePost(id: number, input: Partial<PostModel>): Promise<PostModel>;
  deletePost(id: number);
  getUserPosts(
    userId: number,
    query: PaginationQuery,
  ): Promise<Paginate<PostModel>>;
  getPost(id: number): Promise<PostModel>;
  getRecomendedPosts(
    userIds: number[],
    query: PaginationQuery,
  ): Promise<Paginate<PostModel>>;
}
