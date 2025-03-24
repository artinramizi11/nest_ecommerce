import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Order } from "./order.entity";
import { OrderItem } from "./orderItem.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("decimal", {nullable: true}) 
    price: number;

    @ManyToOne(() => Category, category => category.products, { eager: true })
    @JoinColumn()
    category: Category;

    @OneToMany(() => OrderItem, order => order.product)
    order_item: OrderItem

    @Column({nullable: true})
    stock: number

  
}