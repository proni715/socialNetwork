import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { GetAllUsersQuery } from 'src/domain/dto/getAllUsers.dto';

export class GetAllUsersDto implements GetAllUsersQuery {
  @ApiProperty({ required: false, type: 'number' })
  @IsOptional()
  take?: number;

  @ApiProperty({ required: false, type: 'number' })
  @IsOptional()
  skip?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
