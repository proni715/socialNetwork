import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQuery } from 'src/domain/common/pagination.dto';

export class PaginationDto implements PaginationQuery {
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
}
