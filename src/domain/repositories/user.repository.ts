import { Paginate } from './../common/paginate';
import { DeepPartial } from 'typeorm';
import { UserModel } from '../models/user';
import { PaginationQuery } from '../common/pagination.dto';

export interface UserRepository {
  createUser(input: Partial<UserModel>): Promise<UserModel>;
  updateUser(id: number, input: Partial<UserModel>): Promise<UserModel>;
  deleteUser(id: number);
  getAllUsers(query: PaginationQuery): Promise<Paginate<UserModel>>;
  findByEmail(email: string): Promise<UserModel>;
  findById(id: number);
}
