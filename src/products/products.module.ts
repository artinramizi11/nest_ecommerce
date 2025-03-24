import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { Category } from "src/entities/category.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Product,Category])],
    controllers:[ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}