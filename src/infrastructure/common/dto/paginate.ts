import { IsArray } from 'class-validator';
import { Paginate as DomainPaginate } from '../../../domain/common/paginate';
import { ApiProperty } from '@nestjs/swagger';
export class Paginate<T> implements DomainPaginate<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty()
  readonly count: number;
}
