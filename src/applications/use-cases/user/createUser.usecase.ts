import { UserRepository } from 'src/domains/repositories/user.repository';
import { UserModel } from 'src/domains/model/user';
import * as bcrypt from 'bcryptjs';
import { DeepPartial } from 'typeorm';

export class CreateUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(input: DeepPartial<UserModel>): Promise<UserModel> {
    const salt: string = bcrypt.genSaltSync(10);
    input.password = await bcrypt.hashSync(input.password, salt);

    return await this.usersRepository.createUser(input);
  }
}
