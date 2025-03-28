import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    email: string 

    @IsString()
    password: string
}