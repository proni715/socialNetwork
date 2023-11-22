import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GenerateTokenUseCase } from 'src/application/use-cases/auth/generateToken.usecase';
import { CreateUserUseCase } from 'src/application/use-cases/user/createUser.usecase';
import { FindUserByEmailUseCase } from 'src/application/use-cases/user/findUserByEmail.usecase';
import { ValidatePasswordUseCase } from 'src/application/use-cases/user/validatePassword.usecase';
import { UserModel } from 'src/domain/models/user';
import { User } from 'src/infrastructure/entities/user.entity';
import { UseCaseProxy } from 'src/infrastructure/usercase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usecase-proxy.module';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthService {
  @Inject(UsecaseProxyModule.VALIDATE_PASSWORD_USE_CASE)
  private readonly validatePasswordUseCase: UseCaseProxy<ValidatePasswordUseCase>;
  @Inject(UsecaseProxyModule.GENERATE_TOKEN_USE_CASE)
  private readonly generateTokenUseCase: UseCaseProxy<GenerateTokenUseCase>;
  @Inject(UsecaseProxyModule.FIND_BY_EMAIL_USER_USE_CASE)
  private readonly findByEmailUseCase: UseCaseProxy<FindUserByEmailUseCase>;
  @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
  private readonly createUserUseCase: UseCaseProxy<CreateUserUseCase>;

  public async signup(input: DeepPartial<User>): Promise<User> {
    return await this.createUserUseCase.getInstance().execute(input);
  }

  public async signin(
    input: DeepPartial<User>,
  ): Promise<Record<string, string>> {
    const user: UserModel = await this.findByEmailUseCase
      .getInstance()
      .execute(input.email);

    const isPasswordValid: boolean = await this.validatePasswordUseCase
      .getInstance()
      .execute(input.password, user.password);

    if (isPasswordValid) {
      return {
        access: await this.generateTokenUseCase
          .getInstance()
          .execute('1h', user),
        refresh: await this.generateTokenUseCase
          .getInstance()
          .execute('30d', user),
      };
    }
    throw new UnauthorizedException([
      'Email or password is incorrect. Please, try again',
    ]);
  }
}
