import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserModel } from 'src/domain/model/user';

export class FindUserByEmailUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(email: string): Promise<UserModel> {
    return await this.usersRepository.findByEmail(email);
  }
}
