import { DatabaseModule } from '@app/database/database.module';
import { SERVICES } from '@app/utils/constants';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: SERVICES.USER,
      useClass: UserService,
    },
  ],
  exports: [SERVICES.USER],
})
export class UserModule {}
