import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreateCategoryDto {

    @PrimaryGeneratedColumn()
    id: number 

    @IsString()
    category_name: string


}