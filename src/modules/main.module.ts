import { Module } from '@nestjs/common';
import { AuthModule } from './main/auth/auth.module';
import { UserModule } from './main/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
  ],
})
export class MainModule {}
