import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsInt, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateProductDto {

    @ApiProperty({example: "my_product_name"})
    @IsString()
    name: string 

    @ApiProperty({example: 30})
    @IsInt()
    price: number 
    
    @ApiProperty({example: 2, description: "Category needs to exists on our database"})
    @IsInt()
    categoryId: number 

    @ApiProperty({example: 30})
    @IsBoolean()
    stock: number
}