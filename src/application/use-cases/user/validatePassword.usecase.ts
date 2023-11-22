import * as bcrypt from 'bcryptjs';

export class ValidatePasswordUseCase {
  async execute(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compareSync(password, userPassword);
  }
}
