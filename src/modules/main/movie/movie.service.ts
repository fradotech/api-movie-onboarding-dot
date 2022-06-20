import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieTag } from './entities/movie-tag.entity';
import { Movie } from './entities/movie.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(MovieTag) private movieTagRepository: Repository<MovieTag>
  ) {}

  // Harusnya di MovieRepository tapi entah kenapa error
  // Harusnya pakai db transaction juga
  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepository.save(createMovieDto)

    createMovieDto.tags.forEach(async tagId => {
      const tag = await this.tagRepository.findOne(tagId)

      const movieTag = new MovieTag
      movieTag.movie = movie
      movieTag.tag = tag

      await this.movieTagRepository.save(movieTag)
    })
  }

  findAll() {
    return this.movieRepository.find()
  }

  // Return mentah
  async findOne(id: number) {
    const movie = await this.movieRepository.findOne(id)
    const tags = await this.movieTagRepository.find({ where: { movie }})

    return {
      movie,
      tags
    }
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  findAllTags() {
    return this.tagRepository.find()
  }
}
