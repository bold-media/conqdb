import { UserService } from '@app/user/user.service';
import { SERVICES } from '@app/utils/constants';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@app/user/user.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthGuard,
    {
      provide: SERVICES.AUTH,
      useClass: AuthService,
    },
  ],
  exports: [SERVICES.AUTH],
})
export class AuthModule {}
