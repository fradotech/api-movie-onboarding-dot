import { Module } from '@nestjs/common';
import { AuthModule } from './main/auth/auth.module';
import { UserModule } from './main/user/user.module';
import { MoviesModule } from './main/movies/movies.module';
import { SchedulesModule } from './main/schedules/schedules.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MoviesModule,
    SchedulesModule,
  ],
})
export class MainModule {}
