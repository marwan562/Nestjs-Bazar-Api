import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOneOptions,
  FindOptionsRelations,
  Repository,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepositoty: Repository<CategoryEntity>,
  ) {}

  public async findAll(relations?:FindOptionsRelations<CategoryEntity>): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepositoty.find({
      relations,
    });
    if (!categories) {
      throw new NotFoundException('Categories Not Found');
    }
    return categories;
  }

  public async findOne(
    id: number,
    relations?: FindOptionsRelations<CategoryEntity>,
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepositoty.findOne({
      where: { id },
      relations,
    });

    if (!category) {
      throw new HttpException('Category Not Found.', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  public async create(
    createCategoryDto: CreateCategoryDto,
    currentUser: UserEntity,
  ) {
    const newCategory = this.categoryRepositoty.create(createCategoryDto);

    const existingCategory = await this.categoryRepositoty.findOne({
      where: { name: createCategoryDto.name },
    });
    if (existingCategory) {
      throw new HttpException(
        `Category with name ${createCategoryDto.name} already exists.`,
        400,
      );
    }
    newCategory.createdBy = currentUser;
    return this.categoryRepositoty.save(newCategory);
  }
  public async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    await this.categoryRepositoty.update(id, updateCategoryDto);
    return category;
  }

  public async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoryRepositoty.delete(id);
    return category;
  }
}
