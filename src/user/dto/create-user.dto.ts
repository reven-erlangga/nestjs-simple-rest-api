import { Prisma } from '@prisma/client';
import { Validate, IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto implements Prisma.userCreateInput {
  @IsEmail(
    {},
    {
      message: 'Please insert an email',
    },
  )
  @IsNotEmpty({
    message: 'Email is required!',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
