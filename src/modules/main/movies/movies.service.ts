import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../schedules/entities/schedule.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieTag } from './entities/movie-tag.entity';
import { Movie } from './entities/movie.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
    @InjectRepository(MovieTag) private moviesTagRepository: Repository<MovieTag>,
    @InjectRepository(Schedule) private schedulesRepository: Repository<Schedule>
  ) {}

  // Harusnya di MovieRepository tapi entah kenapa error
  // Harusnya pakai db transaction juga
  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.moviesRepository.save(createMovieDto)

    createMovieDto.tags.forEach(async tagId => {
      const tag = await this.tagsRepository.findOne(tagId)

      const movieTag = new MovieTag
      movieTag.movie = movie
      movieTag.tag = tag

      await this.moviesTagRepository.save(movieTag)
    })
  }

  findAll() {
    return this.moviesRepository.find()
  }

  // Return mentah
  async findOne(id: number) {
    const movie = await this.moviesRepository.findOne(id)
    const tags = await this.moviesTagRepository.find({ where: { movie }})

    return {
      movie,
      tags
    }
  }

  findAllTags() {
    return this.tagsRepository.find()
  }

  nowPlaying() {
    return this.schedulesRepository.find()
  }
}
