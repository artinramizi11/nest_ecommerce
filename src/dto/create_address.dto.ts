import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

export class CreateAddressDto {

    @ApiProperty({example: 60000})
    @IsNotEmpty()
    @IsInt()
    postal_code: number 

    @ApiProperty({example: "gjilan"})
    @IsNotEmpty()
    @IsString()
    city: string 

    @ApiProperty({example: "kosova"})
    @IsNotEmpty()
    @IsString()
    country: string 

    @ApiProperty({example: 6})
    @IsNotEmpty()
    @IsInt()
    house_number: number 

}