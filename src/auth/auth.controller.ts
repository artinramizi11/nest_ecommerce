import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { LoginUserDto } from "src/dto/login_user.dto";
import { AuthService } from "./auth.service";
import { JwtGuard } from "src/jwt.guard";

@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Get("profile")
    @UseGuards(JwtGuard)
    getProfile(@Req() req){
        return this.authService.getUserInformation(req.user.sub)
    }

    @Post("login")
    login(@Body() loginUser: LoginUserDto){
        return this.authService.login(loginUser)
    }
}