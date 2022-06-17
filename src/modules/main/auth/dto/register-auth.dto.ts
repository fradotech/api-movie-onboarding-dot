import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IsExist } from 'src/utils/validator/exist.validator';
import { User } from '../../users/entities/user.entity';

export class RegisterAuthDto {
  @IsOptional()
  @ApiProperty()
  id: number

  @IsString()
  @MaxLength(200)
  @ApiProperty()
  name: string

  @IsEmail()
  @IsExist([User, 'email'])
  @ApiProperty()
  email: string

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string

  @ApiProperty()
  avatar: string
}
