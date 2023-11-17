import { UserRepository } from 'src/domains/repositories/user.repository';
import { UserModel } from 'src/domains/model/user';
import { ICreateUserDto } from 'src/domains/dto/create-user.interface';
import * as bcrypt from 'bcryptjs';

export class CreateUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(input: ICreateUserDto): Promise<UserModel> {
    const salt: string = bcrypt.genSaltSync(10);
    input.password = await bcrypt.hashSync(input.password, salt);

    return await this.usersRepository.createUser(input);
  }
}
