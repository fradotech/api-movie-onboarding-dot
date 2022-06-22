import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../schedules/entities/schedule.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Schedule,
      User
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
