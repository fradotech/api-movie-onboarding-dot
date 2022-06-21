import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { CustomResponse } from 'src/utils/responses/custom.response';

@ApiTags('schedules')
@Controller('schedules')
@UseGuards(JwtGuard)
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    const schedule = await this.schedulesService.create(createScheduleDto)

    return CustomResponse.success(HttpStatus.CREATED, schedule, 'Create successfull')  
  }

  @Get()
  async findAll() {
    const schedules = await this.schedulesService.findAll()

    return CustomResponse.success(HttpStatus.OK, schedules, 'Get schedules successfull')  
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const schedule = await this.schedulesService.findOne(id)

    return CustomResponse.success(HttpStatus.OK, schedule, 'Get schedule successfull')  
  }  
}
