import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserModel } from 'src/domain/models/user';
import * as bcrypt from 'bcryptjs';

export class UpdateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(id: number, input: Partial<UserModel>): Promise<UserModel> {
    if (input.password) {
      const salt: string = bcrypt.genSaltSync(10);
      input.password = await bcrypt.hashSync(input.password, salt);
    }

    return await this.usersRepository.updateUser(id, input);
  }
}
