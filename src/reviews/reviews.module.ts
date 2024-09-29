import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import AuthMiddleware from 'src/common/middlewares/auth.middleware';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TypeOrmModule.forFeature([ReviewEntity]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'reveiws', method: RequestMethod.GET },
        { path: 'reveiws/:id', method: RequestMethod.GET },
      )
      .forRoutes(ReviewsController);
  }
}
