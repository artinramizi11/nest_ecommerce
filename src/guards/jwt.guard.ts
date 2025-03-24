import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private reflector: Reflector
    ){}

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers?.authorization

        const jwt_not_included = this.reflector.getAllAndOverride("jwt-not-included", [context.getHandler(),context.getClass()])

        if(jwt_not_included) return true


        if(!authHeader) throw new UnauthorizedException("Authorization expected")

            const [bearer,token] = authHeader.split(" ")
        if(!bearer) throw new UnauthorizedException("Authorization implemented wrong")

            const payload = this.jwtService.verify(token, {secret: this.configService.get("jwt_secret_key") as string})
            request.user = payload

        return true
    }
}