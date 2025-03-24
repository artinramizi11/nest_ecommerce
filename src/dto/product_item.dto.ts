import { IsIn, IsInt, IsString } from "class-validator"

export class ProductItem {
    @IsInt()
    id: number 

    @IsString()
    name: string

    @IsInt()
    quantity: number

}