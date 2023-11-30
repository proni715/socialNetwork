import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdatePostDto {
  @ApiProperty({ required: true, type: 'string' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({ isArray: true })
  @IsOptional()
  @IsString({ each: true })
  attachments?: string[];
}
