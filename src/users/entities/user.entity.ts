import { CategoryEntity } from 'src/categories/entities/category.entity';
import { Role } from 'src/common/enums/user.roles.enum';
import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @Column({ type: 'enum', enum: Role, array: true, default: [Role.User] })
  roles: Role[];
  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;

  @OneToMany(() => CategoryEntity, (category) => category.createdBy)
  categories: CategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.createdBy)
  products: ProductEntity[];

  
}
