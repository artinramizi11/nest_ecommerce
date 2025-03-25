import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { LoginUserDto } from "src/dto/login_user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { JwtNotIncluded } from "src/decorators/jwt-not-included.decorator";
import { CreateUserDto } from "src/dto/create_user.dto";
import { JwtRefreshGuard } from "src/guards/jwt-refresh.guard";

@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @JwtNotIncluded()
    @Post("register")
    createUser(@Body(new ValidationPipe()) createUser: CreateUserDto){
       return this.authService.createUser(createUser)

    }

    @JwtNotIncluded()
    @ApiOperation({summary: "Log in"})
    @Post("login")
    login(@Body() loginUser: LoginUserDto){
        return this.authService.login(loginUser)
    }

    @ApiOperation({summary: "Get your profile"})
    @Get("profile")
    @UseGuards(JwtGuard)
    getProfile(@Req() req){
        return this.authService.getUserInformation(req.user.sub)
    }

    @JwtNotIncluded()
    @UseGuards(JwtRefreshGuard)
    @Post("refresh-token")
    refreshToken(@Req() req){
        return this.authService.refreshToken(req.user.sub)
    }

   
}