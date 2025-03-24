import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginUserDto } from "src/dto/login_user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private usersRepository: Repository<User>,
        private configService: ConfigService
    ){}

    async login(user: LoginUserDto){
        const userExists = await this.usersRepository.findOne({where: {email: user.email}})
        if(!userExists){
            throw new UnauthorizedException("No user found")
        }
        const validPassword = userExists.password === user.password
        if(!validPassword) throw new UnauthorizedException("Wrong Credentials")
        return this.generateToken(userExists.id)

    }

    async generateToken(userId: number){
        const user = await this.usersRepository.findOne({where: {id: userId}})
        if(!user) throw new NotFoundException("No user found with this id")
        const payload = {sub: user.id, email: user.email, role: user.role}
    const token = this.jwtService.sign(payload, {secret: this.configService.get("jwt_secret_key") as string })
    return token}


    async getUserInformation(userId: number){
        const user = await this.usersRepository.findOne({where: {id: userId}})
        if(!user) throw new NotFoundException("no user found in database by this id")
            return user
    }


    
}