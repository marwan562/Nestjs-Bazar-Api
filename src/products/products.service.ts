// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { FindOptionsRelations, Repository } from 'typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findCategory(id: number) {
    return await this.categoriesService.findOne(id);
  }

  async create(
    createProductDto: CreateProductDto,
    currentUser: UserEntity,
  ): Promise<ProductEntity> {
    const category = await this.findCategory(createProductDto.categoryById);
    const product = this.productRepository.create(createProductDto);
    product.createdBy = currentUser;
    product.categoryId = category;
    return await this.productRepository.save(product);
  }

  async findAll(
    relations?: FindOptionsRelations<ProductEntity>,
  ): Promise<ProductEntity[]> {
    return await this.productRepository.find({relations});
  }

  async findOne(
    id: number,
    relations?: FindOptionsRelations<ProductEntity>,
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations,
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<ProductEntity> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return product;
  }
}
