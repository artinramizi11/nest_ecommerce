import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

@Module({
    imports: [
      TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
})
export class AuthModule {

}