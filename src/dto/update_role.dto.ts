import { IsEnum, IsInt, IsString } from "class-validator";
import { Roles } from "src/enums/roles.enum";

export class UpdateRoleDto {
    @IsInt()
    userId: number 

    @IsEnum(Roles)
    role: Roles
}