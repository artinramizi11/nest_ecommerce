import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { all_permissions } from "src/enums/permissions";
import { Roles } from "src/enums/roles.enum";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ){}
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        const user = request.user
        const requiredPermissions = this.reflector.getAllAndOverride("permissions", [context.getHandler(),context.getClass()])
        const requiredRoles = this.reflector.getAllAndOverride("roles", [context.getHandler(),context.getClass()])


        if(!requiredRoles && !requiredPermissions) return true

        const hasRequiredAnyRole = requiredRoles?.some((role) => user.role.includes(role) ?? false)

        console.log(user)

        const GetPermissionDataByRole = (role: Roles) => {
            return all_permissions?.[role] ?? undefined
        }

        const actualPermissions = GetPermissionDataByRole(user.role)

        const hasRequiredPermissions = requiredPermissions?.every((permission) => actualPermissions.includes(permission)) ?? false

        if((requiredRoles && hasRequiredAnyRole) || (requiredPermissions && hasRequiredPermissions)) {
            return true
        }


        throw new UnauthorizedException("You are not authorized for this action")

 }
}