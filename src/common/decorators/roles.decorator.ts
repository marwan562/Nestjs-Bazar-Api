import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/user.roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);
