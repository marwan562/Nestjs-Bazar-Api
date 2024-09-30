import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll( relations?: FindOptionsRelations<UserEntity>) {
    return this.userRepository.find({relations});
  }

  async findById(id: number, relations?: FindOptionsRelations<UserEntity>) {
    return this.userRepository.findOne({
      where: { id },
      relations,
    });
  }
}
