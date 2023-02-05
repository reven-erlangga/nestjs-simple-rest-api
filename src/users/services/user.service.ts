import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.cacheManager.get('user:findAll');

    if (!users) {
      const users = this.userRepository.find();
      await this.cacheManager.set('user:findAll', users, 60);

      return users;
    }

    return users;
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
