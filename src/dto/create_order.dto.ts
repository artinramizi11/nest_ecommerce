import { Type } from "class-transformer"
import { IsArray, IsInt, IsNumber, IsString, ValidateNested } from "class-validator"
import { ProductItem } from "./product_item.dto"
import { ApiProperty } from "@nestjs/swagger"


export class CreateOrderDto {

    @ApiProperty({example: 1, description: "Needs to type the user id"})
    @IsInt()
    userId: number 

    @ApiProperty({type: () => ProductItem, isArray: true})
    @IsArray()
    @Type(() => ProductItem)
    @ValidateNested({each: true})
    products: ProductItem[]
   
}


