import appConfig, { DbConfigMysql } from "src/config/app.config";

const dbConfigMysql: DbConfigMysql = appConfig().db.mysql;

module.exports = {
  type: 'mysql',
  host: dbConfigMysql.host,
  port: dbConfigMysql.port,
  username: dbConfigMysql.user,
  password: dbConfigMysql.password,
  database: dbConfigMysql.database,
  entities: ["dist/**/*.entity{.ts,.js}"],
  seeds: ['src/seeds/**/*{.ts,.js}'],
  factories: ['src/factories/**/*{.ts,.js}'],
}