import { IsNotEmpty, IsNumber, Length, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'ProductId is Required.' })
  @IsNumber({}, { message: 'ProductId should be number.' })
  productId: number;

  @IsNotEmpty({ message: 'Rate is Required.' })
  @IsNumber({}, { message: 'Rate should be number.' })
  @Max(5)
  rate: number;

  @IsNotEmpty({ message: 'Content is required.' })
  @Length(0, 150)
  content: string;
}
