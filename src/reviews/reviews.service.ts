import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>, 
    private readonly productsService: ProductsService,
  ) {}

  public async create(
    createReviewDto: CreateReviewDto,
    currentUser: UserEntity,
  ): Promise<ReviewEntity> {
    const product = await this.productsService.findOne(createReviewDto.productId);
    const review = this.reviewRepository.create({ 
      ...createReviewDto, 
      product,
      user: currentUser,
    });
    return await this.reviewRepository.save(review);
  }

  public async findAll(): Promise<ReviewEntity[]> {
    const reviews = await this.reviewRepository.find();
    if (!reviews || reviews.length === 0) {
      throw new NotFoundException('Reviews not found');
    }
    return reviews;
  }

  public async findOne(id: number): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  public async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    const review = await this.findOne(id);
    Object.assign(review, updateReviewDto);
    return await this.reviewRepository.save(review);
  }

  public async remove(id: number): Promise<ReviewEntity> {
    const review = await this.findOne(id);
    await this.reviewRepository.delete(id);
    return review;
  }
}
