import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usecase-proxy.module';
import { UserExistConstraint } from './constraints/userExist';
import { JwtStrategy } from 'src/infrastructure/strategies/jwt.strategy';
import { EnvironmentConfigModule } from 'src/infrastructure/config/config.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    EnvironmentConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    UsecaseProxyModule.register(),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, UserExistConstraint, AuthService],
})
export class AuthModule {}
