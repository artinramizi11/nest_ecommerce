import { Body, Controller, Get, Patch, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { LoginUserDto } from "src/dto/login_user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { JwtNotIncluded } from "src/decorators/jwt-not-included.decorator";
import { CreateUserDto } from "src/dto/create_user.dto";
import { JwtRefreshGuard } from "src/guards/jwt-refresh.guard";
import { UpdateRoleDto } from "src/dto/update_role.dto";
import { SetRoles } from "src/decorators/roles.decorator";
import { Roles } from "src/enums/roles.enum";

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

    @ApiOperation({summary: "Refresh token"})
    @JwtNotIncluded()
    @UseGuards(JwtRefreshGuard)
    @Post("refresh-token")
    refreshToken(@Req() req){
        return this.authService.refreshToken(req.user.sub)
    }

    @ApiOperation({summary: "Update user's role"})
    @SetRoles(Roles.Owner)
    @Patch("role")
    updateRole(@Body(new ValidationPipe()) updateRole: UpdateRoleDto){
        return this.authService.updateRole(updateRole)
    }

   
}