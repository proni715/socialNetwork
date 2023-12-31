import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      subscribers: ['dist/**/*.subscriber.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'simple-console',
      autoLoadEntities: true,
      ssl: { ca: process.env.SSL_CERT, rejectUnauthorized: false },
      // never use TRUE in production!
      synchronize: true,
      migrationsRun: true,
    };
  }
}
