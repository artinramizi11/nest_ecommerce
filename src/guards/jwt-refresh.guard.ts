import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { User } from "src/entities/user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class JwtRefreshGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private dataSource: DataSource
    ){}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers?.authorization

        const [bearer,token] = authHeader.split(" ")

        if(!bearer && !token) throw new UnauthorizedException()

            const user = await this.dataSource.getRepository(User).findOne({where: {refresh_token: token}})

            if(!user) throw new UnauthorizedException("wrong refresh token")

        if(user?.refresh_token === token) {
            const payload = this.jwtService.verify(token, {secret: this.configService.get("jwt_refresh_key")})
            request.user = payload
            return true

        }

      
        throw new UnauthorizedException()
        
    }
}