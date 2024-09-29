import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(0,100)
  description: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsArray()
  images: string[];

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  categoryById:number
}
