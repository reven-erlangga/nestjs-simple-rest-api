import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail, Validate } from 'class-validator';

export class CreateUserDto implements Prisma.userCreateInput {
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
}
