import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usercase-proxy.module';
import { UserController } from './user.controller';
import { UserExistConstraint } from './constraints/userExist';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UserController],
  providers: [UserExistConstraint],
})
export class UserModule {}
