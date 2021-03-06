import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Like, Repository } from 'typeorm';
import { Schedule } from '../schedules/entities/schedule.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)

  constructor(
    @InjectRepository(Schedule) private schedulesRepository: Repository<Schedule>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private usersRepository: Repository<User>,
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

  // Real case mungkin EVERY_6_HOURS
  @Cron(CronExpression.EVERY_10_SECONDS)
  async triggerNotifications() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

    const schedules = await getRepository(Schedule).find({
      start_time: Like(`%${date}%`)
    });

    schedules.forEach(async schedule => {
      const order = await this.ordersRepository.findOne({ where: { schedule } })
      const user = await this.usersRepository.findOne(order.user.id)
        // Harusnya send notifikasi 
        this.logger.verbose(`Send notification to user "${user.name}"`);
        this.logger.verbose(`Movie "${schedule.movie.title}" will play at "${schedule.start_time}"`)
      
    })
  }
}
