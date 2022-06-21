import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @ApiProperty()
  id: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  schedule_id: number
}
