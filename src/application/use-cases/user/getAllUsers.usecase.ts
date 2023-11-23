import { Paginate } from './../../../domain/common/paginate';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserModel } from 'src/domain/models/user';
import { PaginationQuery } from 'src/domain/common/pagination.dto';

export class GetAllUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(query: PaginationQuery): Promise<Paginate<UserModel>> {
    return await this.usersRepository.getAllUsers(query);
  }
}
