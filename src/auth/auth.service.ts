import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDTO } from './dto/signup-auth.dto';
import { SignInDTO } from './dto/signin-auth.dto';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private async existingUser(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'password',
        'roles',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  public async signup(signUpDTO: SignUpDTO) {
    const { email, password, name } = signUpDTO;

    if (await this.existingUser(email)) {
      throw new ConflictException('Email already exists');
    }

    const newUser = this.userRepository.create({
      email,
      password: await bcrypt.hash(password, 10),
      name,
    });

    await this.userRepository.save(newUser);

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_JWT);

    delete newUser.password

    return { user: newUser, token };
  }

  public async signin(signInDTO: SignInDTO) {
    const { email, password } = signInDTO;

    const user = await this.existingUser(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT);

    delete user.password

    return { user, token };
  }
}
