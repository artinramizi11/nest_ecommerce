import { IsBoolean, IsIn, IsInt, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateProductDto {

    @IsString()
    name: string 

    @IsInt()
    price: number 
    
    @IsInt()
    categoryId: number 

    @IsBoolean()
    stock: number
}