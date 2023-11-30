import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructure/usercase-proxy/usecase-proxy.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
