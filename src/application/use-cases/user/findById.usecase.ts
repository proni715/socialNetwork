import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserModel } from 'src/domain/models/user';

export class FindUserByIdUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(id: number): Promise<UserModel> {
    return await this.usersRepository.findById(id);
  }
}
