import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Permissions } from "src/enums/permissions.enum";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/enums/roles.enum";
import { SetRoles } from "src/decorators/roles.decorator";
import { SetPermissions } from "src/decorators/permissions.decorator";

@ApiBearerAuth()
@Controller("users")
export class UsersController {

    constructor(
        private usersService: UsersService
    ){}

    @SetRoles(Roles.Admin)
    @SetPermissions(Permissions.view_users)
    @ApiOperation({summary: "Get all users"})
    @Get()
    getUsers(){
        return  this.usersService.findAll()
    }

    @SetPermissions(Permissions.view_user_id)
    @ApiOperation({summary: "Get user by ID"})
    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number){
        return this.usersService.findOne(id)    
    }
}