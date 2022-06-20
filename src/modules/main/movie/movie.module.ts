import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Tag } from './entities/tag.entity';
import { MovieTag } from './entities/movie-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tag,
      Movie,
      MovieTag
    ])
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
