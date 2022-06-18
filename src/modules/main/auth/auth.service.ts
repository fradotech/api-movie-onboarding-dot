import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 8)
    return this.usersRepository.save(createUserDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    let user = await this.usersRepository.findOne({ where: { email: loginAuthDto.email } })
    if(!user) throw new HttpException('Email not registered', HttpStatus.UNAUTHORIZED)
    if(!(await bcrypt.compare(loginAuthDto.password, user.password))) throw new HttpException('Wrong Password', HttpStatus.UNAUTHORIZED)
    return {
      _token: this.jwtService.sign({id: user.id}),
      user
    }
  }
}
