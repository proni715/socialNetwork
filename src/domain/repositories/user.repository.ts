import { DeepPartial } from 'typeorm';
import { UserModel } from '../models/user';

export interface UserRepository {
  createUser(input: DeepPartial<UserModel>): Promise<UserModel>;
  updateUser(id: number, input: DeepPartial<UserModel>): Promise<UserModel>;
  deleteUser(id: number);
  getAllUsers(): Promise<UserModel[]>;
  findByEmail(email: string): Promise<UserModel>;
  findById(id: number);
}
