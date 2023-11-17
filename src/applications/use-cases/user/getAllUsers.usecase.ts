import { UserRepository } from 'src/domains/repositories/user.repository';
import { UserModel } from 'src/domains/model/user';

export class GetAllUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<UserModel[]> {
    return await this.usersRepository.getAllUsers();
  }
}
