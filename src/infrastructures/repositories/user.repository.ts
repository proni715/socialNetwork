import { UserRepository } from 'src/domains/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/domains/model/user';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUserDto } from 'src/domains/dto/create-user.interface';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<UserModel[]> {
    return await this.userRepository.find();
  }

  async createUser(input: ICreateUserDto): Promise<UserModel> {
    return await this.userRepository.save(input);
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
