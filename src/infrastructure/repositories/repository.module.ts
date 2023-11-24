import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { UserRepositoryOrm } from './user.repository';
import { FriendRequest } from '../entities/friendRequest.entity';
import { FriendRequestRepositoryOrm } from './friend.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, FriendRequest]),
  ],
  providers: [UserRepositoryOrm, FriendRequestRepositoryOrm],
  exports: [UserRepositoryOrm, FriendRequestRepositoryOrm],
})
export class RepositoriesModule {}
