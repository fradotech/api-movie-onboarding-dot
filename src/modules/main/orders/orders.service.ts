import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../schedules/entities/schedule.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Schedule) private schedulesRepository: Repository<Schedule>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User) {
    const schedule = await this.schedulesRepository.findOne(createOrderDto.schedule_id)
    if(!schedule) throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND)

    const order = {
      schedule,
      user
    }
  
    return await this.ordersRepository.save(order)
  }

  findAll() {
    return this.ordersRepository.find();
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne(id)
    if(!order) throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
    
    return this.ordersRepository.findOne(id)
  }
}
