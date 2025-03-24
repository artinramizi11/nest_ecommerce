import { Type } from "class-transformer"
import { IsArray, IsInt, IsNumber, IsString, ValidateNested } from "class-validator"
import { ProductItem } from "./product_item.dto"


export class CreateOrderDto {

    @IsInt()
    userId: number 

    @IsArray()
    @Type(() => ProductItem)
    @ValidateNested({each: true})
    products: ProductItem[]
   
}


