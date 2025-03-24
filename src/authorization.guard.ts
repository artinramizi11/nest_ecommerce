import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ){}
    canActivate(context: ExecutionContext){
        const requiredPermissions = this.reflector.getAllAndOverride("permissions", [context.getHandler(),context.getClass()])
        console.log(requiredPermissions)
        return true
    }
}