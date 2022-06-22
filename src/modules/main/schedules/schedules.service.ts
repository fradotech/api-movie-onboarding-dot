import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movies/entities/movie.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule) private schedulesRepository: Repository<Schedule>,
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const movie = await this.moviesRepository.findOne(createScheduleDto.movie)
    if(!movie) throw new HttpException('Movie not found', HttpStatus.NOT_FOUND)
    
    createScheduleDto.movie = movie

    const createdSchedule = await this.schedulesRepository.save(createScheduleDto)

    return createdSchedule
  }

  findAll() {
    return this.schedulesRepository.find()
  }

  async findOne(id: number) {
    const schedule = await this.schedulesRepository.findOne(id)
    if(!schedule) throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND)

    return schedule
  }
}
