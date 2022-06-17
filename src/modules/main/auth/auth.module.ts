import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import AppConfig, { JwtSecretKey } from 'src/config/app.config';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

const jwtSecretKey: JwtSecretKey = AppConfig().jwt.key;

@Module({
  imports: [
    JwtModule.register({
      secret: `${jwtSecretKey}`,
      signOptions: {
        expiresIn: '30d'
      }
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      User
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
