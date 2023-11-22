import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserModel } from 'src/domain/models/user';

export class ValidateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(decoded: any): Promise<UserModel> {
    return this.usersRepository.findById(decoded.id);
  }
}
