import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Movie } from '../movies/entities/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Schedule,
      Movie
    ])
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService]
})
export class SchedulesModule {}
