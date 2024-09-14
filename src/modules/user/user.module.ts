import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/implementation';
import { UserRepositorySymbol } from './repository/symbol';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
