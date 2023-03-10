import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/input/create-user.input';

@Injectable()
export class UserService {
  constructor(private dbService: PrismaService) {}

  async findAll() {
    return await this.dbService.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  async find(id) {
    return await this.dbService.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  async createUser(data: CreateUserDto) {
    return await this.dbService.user.create({ data });
  }

  async updateUser(id: string, data: any) {
    return await this.dbService.user.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async deleteUser(id: string) {
    return await this.dbService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
