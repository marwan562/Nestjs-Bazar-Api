import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/user.roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  public async create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() currentuser: UserEntity,
  ) {
    return await this.reviewsService.create(createReviewDto, currentuser);
  }

  @Get()
  public async findAll() {
    return await this.reviewsService.findAll({ product: true, user: true });
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.reviewsService.findOne(id, true);
  }

  @Patch(':id')
  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  public async remove(@Param('id') id: string) {
    return await this.reviewsService.remove(+id);
  }
}
