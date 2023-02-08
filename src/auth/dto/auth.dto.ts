import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  hash: string;
}
