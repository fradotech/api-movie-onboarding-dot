import { Controller, Post, Body, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CustomResponse } from 'src/utils/responses/custom.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar', { dest: './public/users/avatar' }))
  async register(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    createUserDto.avatar = file.filename
    let user = await this.authService.register(createUserDto)

    return CustomResponse.success(HttpStatus.CREATED, user, 'Register successfull')
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const loginData = await this.authService.login(loginAuthDto)

    return CustomResponse.success(HttpStatus.ACCEPTED, loginData, 'Login successfull')
  }
}