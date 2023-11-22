import { UserRepository } from 'src/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/domain/models/user';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(input: DeepPartial<UserModel>): Promise<UserModel> {
    return await this.userRepository.save(input);
  }

  async updateUser(
    id: number,
    input: DeepPartial<UserModel>,
  ): Promise<UserModel> {
    await this.userRepository.update(id, input);
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<UserModel[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { id } });
  }
  async deleteUser(id: number) {
    console.log(id);
    return await this.userRepository.delete(id);
  }
}
