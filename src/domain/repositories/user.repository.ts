import { Paginate } from './../common/paginate';
import { UserModel } from '../models/user';
import { GetAllUsersQuery } from '../dto/getAllUsers.dto';

export interface UserRepository {
  createUser(input: Partial<UserModel>): Promise<UserModel>;
  updateUser(id: number, input: Partial<UserModel>): Promise<UserModel>;
  deleteUser(id: number);
  getAllUsers(query: GetAllUsersQuery): Promise<Paginate<UserModel>>;
  findByEmail(email: string): Promise<UserModel>;
  findById(id: number);
}
