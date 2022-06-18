import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import AppConfig, { DbConfigMysql } from './config/app.config';
import { ExistValidator } from './utils/validators/exist.validator';
import { MainModule } from './modules/main.module';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';

const dbConfigMysql: DbConfigMysql = AppConfig().db.mysql;

@Module({
  imports: [
    MainModule,
    ConfigModule.forRoot({
      load: [AppConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbConfigMysql.host,
      port: dbConfigMysql.port,
      username: dbConfigMysql.user,
      password: dbConfigMysql.password,
      database: dbConfigMysql.database,
      entities: ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ExistValidator],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
