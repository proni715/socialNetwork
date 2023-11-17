import { UserRepository } from 'src/domains/repositories/user.repository';
import { UserModel } from 'src/domains/model/user';

export class FindUserByEmailUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(email: string): Promise<UserModel> {
    return await this.usersRepository.findByEmail(email);
  }
}
