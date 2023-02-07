import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async index() {
    return await this.userService.findAll();
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @UsePipes(ValidationPipe)
  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id, @Body() body) {
    return await this.userService.updateUser(id, body);
  }

  @UsePipes(ValidationPipe)
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id) {
    return await this.userService.deleteUser(id);
  }
}
