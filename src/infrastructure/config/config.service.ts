import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { Injectable } from '@nestjs/common';
import { JwtConfig } from 'src/domain/config/jwt.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JwtConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getJwtKey(): string {
    return this.configService.get<string>('JWT_KEY');
  }

  getJwtExpires(): string {
    return this.configService.get<string>('JWT_EXPIRES');
  }
}
