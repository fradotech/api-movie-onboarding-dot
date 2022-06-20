import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IsExist } from 'src/utils/validators/exist.validator';
import { User } from '../../users/entities/user.entity';

export class CreateUserDto {
  @IsOptional()
  @ApiProperty()
  id: number

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  @IsExist([User, 'email'])
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string

  @ApiProperty()
  avatar: string
}
