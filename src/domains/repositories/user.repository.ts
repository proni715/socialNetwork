import { ICreateUserDto } from '../dto/create-user.interface';
import { UserModel } from '../model/user';

export interface UserRepository {
  createUser(input: ICreateUserDto): Promise<UserModel>;
  getAllUsers(): Promise<UserModel[]>;
  findByEmail(email: string): Promise<UserModel>;
}
