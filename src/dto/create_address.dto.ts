import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

export class CreateAddressDto {

    @IsNotEmpty()
    @IsInt()
    postal_code: number 

    @IsNotEmpty()
    @IsString()
    city: string 

    @IsNotEmpty()
    @IsString()
    country: string 

    @IsNotEmpty()
    @IsInt()
    house_number: number 

}