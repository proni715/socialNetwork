import { DeepPartial } from 'typeorm';

import { UserModel } from '../model/user';

export interface UserRepository {
  createUser(input: DeepPartial<UserModel>): Promise<UserModel>;
  getAllUsers(): Promise<UserModel[]>;
  findByEmail(email: string): Promise<UserModel>;
}
