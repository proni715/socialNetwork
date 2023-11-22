import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConfigService } from '../config/config.service';
import { UsecaseProxyModule } from '../usercase-proxy/usecase-proxy.module';
import { UseCaseProxy } from '../usercase-proxy/usecase-proxy';
import { UserModel } from 'src/domain/models/user';
import { ValidateUserUseCase } from 'src/application/use-cases/user/validateUser.usecase';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(UsecaseProxyModule.VALIDATE_USER_USE_CASE)
  private readonly validateUserUseCase: UseCaseProxy<ValidateUserUseCase>;
  constructor(
    @Inject(EnvironmentConfigService) config: EnvironmentConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getJwtKey(),
      ignoreExpiration: false,
    });
  }

  private validate(payload: string): Promise<UserModel | never> {
    return this.validateUserUseCase.getInstance().execute(payload);
  }
}
