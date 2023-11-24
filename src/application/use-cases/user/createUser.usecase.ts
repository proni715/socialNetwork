import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserModel } from 'src/domain/models/user';
import * as bcrypt from 'bcryptjs';

export class CreateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(input: Partial<UserModel>): Promise<UserModel> {
    const salt: string = bcrypt.genSaltSync(10);
    input.password = await bcrypt.hashSync(input.password, salt);

    return this.usersRepository.createUser(input);
  }
}
