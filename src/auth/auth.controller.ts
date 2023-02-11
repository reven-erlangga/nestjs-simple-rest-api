import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Req,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto);
  }

  @Post('local/signin')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signInLocal(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req) {
    const user = req.user;

    return this.authService.logout(user.sub);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req) {
    const user = req.user;

    this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
