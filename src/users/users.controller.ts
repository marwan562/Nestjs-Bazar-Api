import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NestModule,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/user.roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.User, Role.Admin, Role.Manager)
  @UseGuards(RolesGuard)
  public async findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @Roles(Role.User, Role.Admin, Role.Manager)
  @UseGuards(RolesGuard)
  public async getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }
}
