import { UsecaseProxyModule } from './infrastructures/usercase-proxy/usercase-proxy.module';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructures/config/config.module';
import { UserModule } from './presentations/user/user.module';

@Module({
  imports: [UsecaseProxyModule.register(), UserModule, EnvironmentConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
