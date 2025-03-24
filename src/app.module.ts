import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './jwt.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type:"postgres",
        url: configService.get("dbUrl") as string,
        port:5432,
        entities: ['dist/entities/*.js'],
        synchronize:true 
      })}),
       JwtModule.registerAsync({
              imports: [],
              inject: [ConfigService],
              useFactory: (configService:ConfigService) => ({
                secret:  configService.get("jwt_secret_key") as string,
                signOptions: {
                  expiresIn: configService.get("jwt_expires_time") as string
                }})}), UsersModule, OrderModule, ProductsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: JwtGuard}, JwtService],
})
export class AppModule {}
