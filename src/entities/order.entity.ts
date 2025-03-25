import { CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { OrderItem } from "./orderItem.entity";
import { Address } from "./address.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders , {onDelete:"CASCADE"})
    @JoinColumn({name: "userId"})
    user: User;

    @OneToMany(() => OrderItem, item => item.order , {eager: true})
    ordered_products: OrderItem[]

    @CreateDateColumn({type: "timestamp"})
    date_created: Date

    @OneToOne(() => Address, address => address.order , {eager: true, cascade: true})
    address: Address

   
}