import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
  CacheModule,
} from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { ValidationUserMiddleware } from '../middlewares/validation-user.middleware';
import { UserService } from '../services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationUserMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.GET,
    });
  }
}
