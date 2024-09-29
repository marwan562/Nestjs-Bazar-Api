import { CategoryEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ length: 100 })
  description: string;

  @Column()
  thumbnail: string;

  @Column({ type: 'simple-json' })
  images: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.products, { eager: true })
  @JoinColumn({ name: 'createdBy' }) 
  createdBy: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  categoryId: CategoryEntity;
}
