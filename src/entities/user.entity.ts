import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Roles } from "src/enums/roles.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Order, order => order.user , {eager: true, cascade: true})
    orders: Order[];

    @Column({nullable: true, type: "enum", enum: Roles , default: Roles.Customer})
    role: Roles

    @Column({nullable: true})
    refresh_token: string 


}