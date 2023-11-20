import { UserRepository } from 'src/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/domain/model/user';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<UserModel[]> {
    return await this.userRepository.find();
  }

  async createUser(input: DeepPartial<UserModel>): Promise<UserModel> {
    return await this.userRepository.save(input);
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
