import {
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FriendRequestStatus } from 'src/domain/enums/friendRequestStatus';

export class UpdateFriendRequestDto {
  @ApiProperty({
    required: true,
    enum: FriendRequestStatus,
  })
  @IsEnum(FriendRequestStatus)
  status!: FriendRequestStatus;
}
