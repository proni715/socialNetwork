import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usercase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usercase-proxy/usecase-proxy';
import { FindUserByEmailUseCase } from 'src/application/use-cases/user/findUserByEmail.usecase';

@ValidatorConstraint({ name: 'IsUserAlreadyExist', async: true })
@Injectable()
export class UserExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(UsecaseProxyModule.FIND_BY_EMAIL_USER_USE_CASE)
    private readonly findUserByEmailUsecaseProxy: UseCaseProxy<FindUserByEmailUseCase>,
  ) {}

  async validate(email: string) {
    const user = await this.findUserByEmailUsecaseProxy
      .getInstance()
      .execute(email);
    return !user;
  }
}
