import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomResponse } from 'src/utils/responses/custom.response';

@ApiTags('movies')
@Controller('movies')
@UseGuards(JwtGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('tags')
  async findAllTags() {
    let tags = await this.movieService.findAllTags();

    return CustomResponse.success(HttpStatus.OK, tags, 'Get all tags successfull')
  }

  @Post()
  @UseInterceptors(FileInterceptor('poster', { dest: './public/movies/poster' }))
  async create(@Body() createMovieDto: CreateMovieDto, @UploadedFile() file: Express.Multer.File): Promise<CustomResponse> {
    createMovieDto.poster = file.filename
    let movie = await this.movieService.create(createMovieDto);

    return CustomResponse.success(HttpStatus.CREATED, movie, 'Create successfull')
  }

  @Get()
  async findAll(): Promise<CustomResponse> {
    let movies = await this.movieService.findAll();

    return CustomResponse.success(HttpStatus.OK, movies, 'Get all movie successfull')
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
