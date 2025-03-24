import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsInt, IsString } from "class-validator"

export class ProductItem {
    @ApiProperty({example: 1})
    @IsInt()
    id: number 

    @ApiProperty({example: "monitor"})
    @IsString()
    name: string

    @ApiProperty({example: 2})
    @IsInt()
    quantity: number

}