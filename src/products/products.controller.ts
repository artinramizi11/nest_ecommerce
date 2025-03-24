import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "src/dto/create_product";
import { ApiOperation } from "@nestjs/swagger";
import { Permissions } from "src/enums/permissions.enum";
import { SetPermissions } from "src/decorators/permissions.decorator";

@Controller("products")
export class ProductsController {

    constructor(
        private productsService: ProductsService
    ){}


    @SetPermissions(Permissions.view_products)
    @ApiOperation({summary: "Get products"})
    @Get()
    getProducts(){
        return this.productsService.getProducts()
    }
    
    @SetPermissions(Permissions.create_product)
    @ApiOperation({summary: "Create new product"})
    @Post()
    createProduct(@Body(new ValidationPipe()) createProduct: CreateProductDto){
        return this.productsService.createProduct(createProduct)
    }

}