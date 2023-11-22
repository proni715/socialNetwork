import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserModel } from 'src/domain/models/user';

export class GetAllUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<UserModel[]> {
    return await this.usersRepository.getAllUsers();
  }
}
