import { ProductEntity } from 'src/products/entities/product.entity';
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

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @Column({ length: 150 })
  content: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  @JoinColumn({ name: 'product' })
  product: ProductEntity;
}
