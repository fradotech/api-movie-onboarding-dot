import { Controller, Get, HttpStatus, Request, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomResponse } from 'src/utils/responses/custom.response';
import { JwtGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  async me(@Request() req: any): Promise<CustomResponse> {
    return CustomResponse.success(HttpStatus.OK, req.user, 'Get user successfull')
  }

  @Get('avatar')
  async avatar(@Request() req: any, @Res() res: any): Promise<any> {
    return await res.sendFile(req.user.avatar, { root: './public/users/avatar' })
  }
}
