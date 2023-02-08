import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsEmail(
    {},
    {
      message: 'Please insert an email',
    },
  )
  @IsNotEmpty({
    message: 'Please insert your email!',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  hash: string;

  @IsNotEmpty()
  hashedRt: string;
}
