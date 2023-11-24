import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Inject,
  UseGuards,
  UseInterceptors,
  Body,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/infrastructure/entities/user.entity';
import { JwtAuthGuard } from 'src/infrastructure/guards/auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { GetAllUsersDto } from './dto/getUsers.dto';
import { Paginate } from 'src/infrastructure/common/dto/paginate';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get()
  async getAllUsers(@Query() query: GetAllUsersDto): Promise<Paginate<User>> {
    return this.userService.getAllUsers(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/me')
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  async update(
    @CurrentUser() user: User,
    @Body() input: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(user.id, input);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  async delete(@CurrentUser() user: User): Promise<Record<string, boolean>> {
    await this.userService.deleteUser(user.id);
    return { success: true };
  }
}
