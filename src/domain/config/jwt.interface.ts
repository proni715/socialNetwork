export interface JwtConfig {
  getJwtKey(): string;
  getJwtExpires(): string;
}
