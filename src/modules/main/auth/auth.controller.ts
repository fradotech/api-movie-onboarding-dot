import { Controller, Post, Body, Request, Get, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar', { dest: './public/users/avatar' }))
  async register(@Body() createAuthDto: RegisterAuthDto, @UploadedFile() file: Express.Multer.File) {
    createAuthDto.avatar = file.filename
    console.log(createAuthDto)
    let user = await this.authService.register(createAuthDto)
    return {
      success: true,
      message: 'Register successfull',
      data: user
    }
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const user = await this.authService.validateUser(loginAuthDto)
    const _token = this.authService.generateToken(user)

    return {
      success: true,
      message: 'Login successfull',
      data: {
        _token,
        user
      }
    }
  }

  @Get()
  @UseGuards(JwtGuard)
  async me(@Request() req: any) {
    return {
      success: true,
      message: 'Get user successfull',
      data: req.user
    }
  }

  @Get('avatar')
  @UseGuards(JwtGuard)
  async avatar(@Request() req: any, @Res() res: any) {
    console.log(req.user)
    return await res.sendFile(req.user.avatar, { root: './public/users/avatar' })
  }
}