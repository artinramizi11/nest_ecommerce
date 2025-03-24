import { IsInt, IsString } from "class-validator";
import { CreateAddressDto } from "./create_address.dto";
import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateAddressDto extends PartialType(CreateAddressDto) {

    @ApiPropertyOptional({example: 60000})
    postal_code: number 

    @ApiPropertyOptional({example: "Gjilan"})
    city: string 

    @ApiPropertyOptional({example:"Kosova"})
    country: string 

    @ApiPropertyOptional({example: 62})
    house_number: number 

    
}
