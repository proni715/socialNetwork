import { UsecaseProxyModule } from './infrastructure/usercase-proxy/usecase-proxy.module';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/config.module';
import { UserModule } from './presentation/user/user.module';
import { AuthModule } from './presentation/auth/auth.module';
import { PostModule } from './presentation/post/post.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    UsecaseProxyModule.register(),
    UserModule,
    AuthModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
