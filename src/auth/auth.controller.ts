import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { LoginUserDto } from "src/dto/login_user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { JwtNotIncluded } from "src/decorators/jwt-not-included.decorator";

@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @ApiOperation({summary: "Get your profile"})
    @Get("profile")
    @UseGuards(JwtGuard)
    getProfile(@Req() req){
        return this.authService.getUserInformation(req.user.sub)
    }

    @JwtNotIncluded()
    @ApiOperation({summary: "Log in"})
    @Post("login")
    login(@Body() loginUser: LoginUserDto){
        return this.authService.login(loginUser)
    }
}