import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';

export class UpdateUserDto {
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @Trim()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @Trim()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
