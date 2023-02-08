import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  @Version('1')
  signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto);
  }

  //   @Post('/local/signin')
  //   signInLocal() {
  //     this.authService.signInLocal();
  //   }

  //   @Post('/logout')
  //   logout() {
  //     this.authService.logout();
  //   }

  //   @Post('/refresh')
  //   refreshTokens() {
  //     this.authService.refreshTokens();
  //   }
}
