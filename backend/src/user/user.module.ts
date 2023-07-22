import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmCustomModule } from 'src/common/custom/custom.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository(UserRepository)],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
  ]
})
export class UserModule {}
