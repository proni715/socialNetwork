import { Paginate } from '../common/dto/paginate';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/domain/models/user';
import { DeepPartial, Like, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllUsersDto } from 'src/presentation/user/dto/getUsers.dto';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(input: DeepPartial<User>): Promise<UserModel> {
    return await this.userRepository.save(input);
  }

  async updateUser(
    id: number,
    input: DeepPartial<UserModel>,
  ): Promise<UserModel> {
    await this.userRepository.update(id, input);
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(query: GetAllUsersDto): Promise<Paginate<UserModel>> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const order = query.order || 'DESC';
    const search = query.search || '';

    const [data, count] = await this.userRepository.findAndCount({
      where: { name: Like('%' + search + '%') },
      order: { createdAt: order },
      take: take,
      skip: skip,
    });
    return { data, count };
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { id } });
  }
  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
