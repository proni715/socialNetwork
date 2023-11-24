import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usecase-proxy.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FriendController } from './friend.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UserController, FriendController],
  providers: [UserService],
})
export class UserModule {}
