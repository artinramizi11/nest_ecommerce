import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: "test@outlook.com"})
    @IsEmail()
    email: string 

    @ApiProperty({example:"test23_!"})
    @IsString()
    password: string
}