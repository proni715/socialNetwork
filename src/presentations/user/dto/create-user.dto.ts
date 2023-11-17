import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateUserDto } from 'src/domains/dto/create-user.interface';
import { Trim } from 'class-sanitizer';
import { IsUserExists } from '../decorators/IsUserExist.decorator';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @Trim()
  @IsEmail()
  @IsUserExists({ message: 'Email is already exist' })
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsStrongPassword()
  password: string;
}
