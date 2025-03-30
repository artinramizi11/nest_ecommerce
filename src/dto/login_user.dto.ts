import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {
    @ApiProperty()
    @IsEmail()
    email: string 

    @ApiProperty()
    @IsString()
    password: string
}