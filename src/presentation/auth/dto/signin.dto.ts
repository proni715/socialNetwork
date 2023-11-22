import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';

export class SignInDto {
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @Trim()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  password: string;
}
