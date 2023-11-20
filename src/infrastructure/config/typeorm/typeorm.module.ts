import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../config.service';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config.module';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.{ts,js}'],
  subscribers: ['dist/**/*.subscriber.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'simple-console',
  autoLoadEntities: true,
  // ssl: { ca: process.env.SSL_CERT, rejectUnauthorized: false },
  // never use TRUE in production!
  synchronize: true,
  migrationsRun: true,
});
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
