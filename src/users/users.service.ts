import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}
    
    async findAll(){
        const users = await this.usersRepository.find({relations: ['orders']})
        return users
    }

    async findOne(id: number){
        const user = await this.usersRepository.findOne({where:{id}})
        if(!user) throw new NotFoundException("no user found with this id")
        return user
    }

}