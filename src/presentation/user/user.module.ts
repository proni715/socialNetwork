import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usecase-proxy.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
