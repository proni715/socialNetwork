import { Body, ClassSerializerInterceptor, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from 'src/infrastructure/entities/user.entity';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('/signup')
  async signup(@Body() input: SignUpDto): Promise<User> {
    return this.authService.signup(input);
  }

  @Post('login')
  private async signin(
    @Body() input: SignInDto,
  ): Promise<Record<string, string>> {
    return await this.authService.signin(input);
  }
}
