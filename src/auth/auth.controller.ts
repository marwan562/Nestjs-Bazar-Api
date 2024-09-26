import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup-auth.dto';
import { SignInDTO } from './dto/SignIn-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(@Body() body: SignUpDTO) {
    return this.authService.signup(body);
  }

  @Post('signin')
  public async signin(@Body() body: SignInDTO) {
    return this.authService.signin(body);
  }
}
