import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Tag } from './entities/tag.entity';
import { MovieTag } from './entities/movie-tag.entity';
import { Schedule } from '../schedules/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tag,
      Movie,
      MovieTag,
      Schedule
    ])
  ],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
