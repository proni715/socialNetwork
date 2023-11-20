import { UsecaseProxyModule } from './infrastructure/usercase-proxy/usercase-proxy.module';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/config.module';
import { UserModule } from './presentation/user/user.module';

@Module({
  imports: [UsecaseProxyModule.register(), UserModule, EnvironmentConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
