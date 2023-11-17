import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructures/usercase-proxy/usercase-proxy.module';
import { UseCaseProxy } from 'src/infrastructures/usercase-proxy/usecase-proxy';
import { FindUserByEmailUseCases } from 'src/applications/use-cases/user/findUserByEmail.usecase';

@ValidatorConstraint({ name: 'IsUserAlreadyExist', async: true })
@Injectable()
export class UserExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(UsecaseProxyModule.FIND_BY_EMAIL_USER_USE_CASE)
    private readonly findUserByEmailUsecaseProxy: UseCaseProxy<FindUserByEmailUseCases>,
  ) {}

  async validate(email: string) {
    const user = await this.findUserByEmailUsecaseProxy
      .getInstance()
      .execute(email);
    return !user;
  }
}
