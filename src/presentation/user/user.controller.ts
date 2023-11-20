import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/application/use-cases/user/createUser.usecase';
import { GetAllUserUseCase } from 'src/application/use-cases/user/getAllUsers.usecase';
import { UseCaseProxy } from 'src/infrastructure/usercase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usercase-proxy.module';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/infrastructure/entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetAllUserUseCase>,
    @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase>,
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.getUserUsecaseProxy.getInstance().execute();
  }

  @Post('/signup')
  async create(@Body() input: CreateUserDto): Promise<User> {
    return await this.createUserUsecaseProxy.getInstance().execute(input);
  }
}
