import { UserModel } from 'src/domain/models/user';
import { DeepPartial } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

export class GenerateTokenUseCase {
  constructor(private readonly jwt: JwtService) {}
  async execute(exp: string, user: DeepPartial<UserModel>): Promise<string> {
    return this.jwt.sign(
      { id: user.id, email: user.email },
      {
        expiresIn: exp,
      },
    );
  }
}
