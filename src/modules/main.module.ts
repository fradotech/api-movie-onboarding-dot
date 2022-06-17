import { Module } from '@nestjs/common';
import { AuthModule } from './main/auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
})
export class MainModule {}
