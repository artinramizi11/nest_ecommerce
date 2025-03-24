import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dto/create_user.dto";
import { LoginUserDto } from "src/dto/login_user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private usersRepository: Repository<User>,
        private configService: ConfigService,
    ){}


    async createUser(user: CreateUserDto){
        const userExists = await this.usersRepository.findOne({where: {email: user.email}})
        if(!userExists){
            const newUser  = await this.usersRepository.create({
                ...user 
             })
             return await this.usersRepository.save(newUser)
        }
        throw new BadRequestException("This email is already in use")
       
    }

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
    const token = this.jwtService.sign(payload, {secret: this.configService.get("jwt_secret_key") as string})
    const refreshToken = this.jwtService.sign(payload, {secret: this.configService.get("jwt_refresh_key") as string, expiresIn: this.configService.get("jwt_refresh_expires_time") as string})
    user.refresh_token = refreshToken
    await this.usersRepository.save(user)
    return {
        token,
        refreshToken
    }
}


    async getUserInformation(userId: number){
        const user = await this.usersRepository.findOne({where: {id: userId}})
        if(!user) throw new NotFoundException("no user found in database by this id")
            return user
    }

    async refreshToken(userId: number) {
        const user = await this.usersRepository.findOne({where: {id: userId}})
        if(!user) throw new NotFoundException("No user found with this id")
        return this.generateToken(userId)
    }



    
}