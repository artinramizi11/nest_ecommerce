import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrdersService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[],
    controllers:[OrderController],
    providers:[OrdersService]
})
export class OrderModule {}