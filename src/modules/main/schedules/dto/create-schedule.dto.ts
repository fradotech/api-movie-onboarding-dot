import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Movie } from '../../movies/entities/movie.entity';

export class CreateScheduleDto {
  @IsOptional()
  @ApiProperty()
  id: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  movie: Movie

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  start_time: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  end_time: string
}
