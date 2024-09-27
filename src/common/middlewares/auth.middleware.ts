import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}

@Injectable()
class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}
  

  async use(req: Request, _, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return next(new UnauthorizedException('No token provided'));
    }

    const SECRET_JWT = process.env.SECRET_JWT;

    try {
      const decoded = jwt.verify(token, SECRET_JWT) as { id: number };
      if (!decoded.id) {
        return next(new ForbiddenException('Invalid token'));
      }

      const user = await this.userService.findById(decoded.id);

      if (!user) {
        return next(new ForbiddenException('User not found'));
      }

      req.user = user;
      next();
    } catch (error) {
      return next(new ForbiddenException('Invalid token'));
    }
  }
}

export default AuthMiddleware;
