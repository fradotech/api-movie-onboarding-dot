import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsOptional()
  @ApiProperty()
  id: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string

  @IsString()
  @ApiProperty()
  overview: string

  @ApiProperty()
  poster: string

  @IsNotEmpty()
  @ApiProperty()
  tags: Array<number>

  @IsNotEmpty()
  @ApiProperty()
  play_until: string
}
