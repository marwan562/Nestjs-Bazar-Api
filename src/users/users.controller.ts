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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }
}
