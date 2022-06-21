import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomResponse } from 'src/utils/responses/custom.response';

@ApiTags('movies')
@Controller('movies')
@UseGuards(JwtGuard)
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get('now-playing')
  async nowPlaying() {
    const nowPlaying = await this.movieService.nowPlaying();

    return CustomResponse.success(HttpStatus.OK, nowPlaying, 'Get movie now playing successfull')  
  }

  @Get('tags')
  async findAllTags() {
    const tags = await this.movieService.findAllTags();

    return CustomResponse.success(HttpStatus.OK, tags, 'Get all tags successfull')
  }

  @Post()
  @UseInterceptors(FileInterceptor('poster', { dest: './public/movies/poster' }))
  async create(@Body() createMovieDto: CreateMovieDto, @UploadedFile() file: Express.Multer.File): Promise<CustomResponse> {
    createMovieDto.poster = file.filename
    const movie = await this.movieService.create(createMovieDto);

    return CustomResponse.success(HttpStatus.CREATED, movie, 'Create successfull')
  }

  @Get()
  async findAll(): Promise<CustomResponse> {
    const movies = await this.movieService.findAll();

    return CustomResponse.success(HttpStatus.OK, movies, 'Get movies successfull')
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const movie = await this.movieService.findOne(id);

    return CustomResponse.success(HttpStatus.OK, movie, 'Get movie successfull')  
  }
}
