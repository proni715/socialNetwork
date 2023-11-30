import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreatePostDto {
  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  text: string;

  @ApiProperty({ isArray: true })
  @IsOptional()
  @IsString({ each: true })
  attachments: string[];
}
