import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { UserRepositoryOrm } from './user.repository';
import { FriendRequest } from '../entities/friendRequest.entity';
import { FriendRequestRepositoryOrm } from './friend.repository';
import { Post } from '../entities/post.entity';
import { PostRepositoryOrm } from './post.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, FriendRequest, Post]),
  ],
  providers: [UserRepositoryOrm, FriendRequestRepositoryOrm, PostRepositoryOrm],
  exports: [UserRepositoryOrm, FriendRequestRepositoryOrm, PostRepositoryOrm],
})
export class RepositoriesModule {}
