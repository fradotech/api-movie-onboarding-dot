import { Controller, Get, Post, Body, Param, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { CustomResponse } from 'src/utils/responses/custom.response';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtGuard)export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
    const order = await this.ordersService.create(createOrderDto, req.user);

    return CustomResponse.success(HttpStatus.CREATED, order, 'Create successfull')  
  }

  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll()

    return CustomResponse.success(HttpStatus.OK, orders, 'Get orders successfull')    }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const order = await this.ordersService.findOne(id)

    return CustomResponse.success(HttpStatus.OK, order, 'Get order successfull')    }
}
