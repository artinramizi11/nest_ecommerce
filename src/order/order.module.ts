import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrdersService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { User } from "src/entities/user.entity";
import { Product } from "src/entities/product.entity";
import { OrderItem } from "src/entities/orderItem.entity";
import { Address } from "src/entities/address.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Order,User,Product,OrderItem,Address])],
    controllers:[OrderController],
    providers:[OrdersService]
})
export class OrderModule {}