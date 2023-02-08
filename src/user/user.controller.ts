import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto } from './dto/input/create-user.input';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Version('1')
  async index(@Res() response: FastifyReply) {
    const users = await this.userService.findAll();

    response.send(users);
  }

  @UsePipes(ValidationPipe)
  @Post()
  @Version('1')
  async create(@Body() user: CreateUserDto, @Res() response: FastifyReply) {
    await this.userService.createUser(user);

    response.send(200);
  }

  @Get(':id')
  @Version('1')
  async show(@Param('id', ParseIntPipe) id, @Res() response: FastifyReply) {
    const user = await this.userService.find(id);

    response.send(user);
  }

  @UsePipes(ValidationPipe)
  @Patch('/:id')
  @Version('1')
  async update(@Param('id', ParseIntPipe) id, @Body() body) {
    return await this.userService.updateUser(id, body);
  }

  @UsePipes(ValidationPipe)
  @Delete('/:id')
  @Version('1')
  async delete(@Param('id', ParseIntPipe) id) {
    return await this.userService.deleteUser(id);
  }
}
