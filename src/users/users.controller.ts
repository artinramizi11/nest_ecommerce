import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SetPermissions } from "src/permissions.decorator";
import { Permissions } from "src/enums/permissions.enum";
import { AuthorizationGuard } from "src/authorization.guard";

@Controller("users")
export class UsersController {

    constructor(
        private usersService: UsersService
    ){}

    @Get()
    getUsers(){
        return  this.usersService.findAll()
    }

    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number){
        return this.usersService.findOne(id)
    }

    @Get("hello/test")
    @UseGuards(AuthorizationGuard)
    @SetPermissions(Permissions.view_orders)
    testing(){
        return "hello"
    }


}