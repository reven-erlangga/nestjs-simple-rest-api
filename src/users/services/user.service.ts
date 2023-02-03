import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  store(data: CreateUserDto) {
    const user = new User();

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.isActive = data.isActive;

    return this.userRepository.save(user);
  }

  update(id: number, data: CreateUserDto) {
    return this.userRepository.save({ ...data, id: Number(id) });
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
