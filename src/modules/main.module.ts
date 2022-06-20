import { Module } from '@nestjs/common';
import { AuthModule } from './main/auth/auth.module';
import { UserModule } from './main/user/user.module';
import { MovieModule } from './main/movie/movie.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MovieModule,
  ],
})
export class MainModule {}
