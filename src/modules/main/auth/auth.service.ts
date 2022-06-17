import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  register(registerAuthDto: RegisterAuthDto) {
    registerAuthDto.password = this.hashPassword(registerAuthDto.password)
    return this.usersRepository.save(registerAuthDto);
  }

  async validateUser(loginAuthDto: LoginAuthDto) {
    let user = await this.usersRepository.findOne({ where: { email: loginAuthDto.email } })
    if(!user) throw new HttpException('Email not registered', HttpStatus.UNAUTHORIZED)
    if(this.validatePassword(loginAuthDto.password, user.password)) return user
    throw new HttpException('Wrong Password', HttpStatus.UNAUTHORIZED)
  }

  hashPassword(plainPassword: string) {
    return bcrypt.hashSync(plainPassword, 8)
  }

  validatePassword(plainPassword: string, hashPassword: string) {
    return bcrypt.compareSync(plainPassword, hashPassword)
  }

  generateToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email
    }

    return this.jwtService.sign(payload)
  }
}
