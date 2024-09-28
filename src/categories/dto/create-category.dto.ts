import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(0, 10)
  name: string;

  @Length(0, 50)
  description: string;
}
