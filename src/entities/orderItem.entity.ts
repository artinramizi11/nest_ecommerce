import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number 

    @ManyToOne(() => Product, product => product.order_item, {cascade: true,eager: true})
    product: Product

    @ManyToOne(() => Order, order => order.ordered_products , {onDelete: "CASCADE"})
    order: Order

    @Column({ nullable: true})
    quantity: number
 
}