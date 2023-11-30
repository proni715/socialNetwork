import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Inject,
  UseGuards,
  Post,
  UseInterceptors,
  Body,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/guards/auth.guard';
import { PostService } from './post.service';
import { Paginate } from 'src/infrastructure/common/dto/paginate';
import { Post as PostDB } from 'src/infrastructure/entities/post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { CurrentUser } from 'src/infrastructure/common/decorators/currentUser.decorator';
import { User } from 'src/infrastructure/entities/user.entity';
import { PaginationDto } from 'src/infrastructure/common/dto/pagination.dto';

@ApiTags('posts')
@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  @Inject(PostService)
  private readonly postService: PostService;

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async createPost(
    @CurrentUser() user: User,
    @Body()
    input: CreatePostDto,
  ): Promise<PostDB> {
    return this.postService.createPost({ owner: user, ...input });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/:id')
  async updatePost(
    @Param('id') id: number,
    @Body()
    input: CreatePostDto,
  ): Promise<PostDB> {
    return this.postService.updatePost(id, input);
  }

  @Get('/:id')
  async getPost(@Param('id') id: number): Promise<PostDB> {
    return this.postService.getPost(id);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getRecomendedPosts(
    @CurrentUser() user: User,
    @Query() query: PaginationDto,
  ): Promise<Paginate<PostDB>> {
    return this.postService.getRecomendedPosts(user.id, query);
  }

  @Get('/user/:userId')
  async getUserPosts(
    @Param('userId') userId: number,
    @Query() query: PaginationDto,
  ): Promise<Paginate<PostDB>> {
    return this.postService.getUserPosts(userId, query);
  }
}
