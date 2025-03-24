import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    postal_code: number 

    @Column()
    city: string 

    @Column()
    country: string 

    @Column()
    house_number: number

    @OneToOne(() => Order, order => order.address, {onDelete:"CASCADE"})
    @JoinColumn()
    order: Order

}