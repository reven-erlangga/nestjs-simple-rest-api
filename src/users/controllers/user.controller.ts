import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { NotFoundExceptionFilterEntity } from '../entities/not-found-exception-filter.entity';
import { UserService } from '../services/user.service';

@Controller('users')
@UseFilters(new NotFoundExceptionFilterEntity())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return {
      data: await this.userService.findAll(),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return {
      data: await this.userService.findById(id),
    };
  }

  @Post()
  async store(@Body() data: CreateUserDto) {
    return {
      data: await this.userService.store(data),
    };
  }

  @Put(':id')
  async update(@Body() data: CreateUserDto, @Param('id') id: number) {
    return {
      data: await this.userService.update(id, data),
    };
  }

  @Delete(':id')
  async destroy(@Param('id') id: number) {
    return {
      data: await this.userService.delete(id),
    };
  }
}
