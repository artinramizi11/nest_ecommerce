import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "src/dto/create_product";

@Controller("products")
export class ProductsController {

    constructor(
        private productsService: ProductsService
    ){}


    @Get()
    getProducts(){
        return this.productsService.getProducts()
    }
    
    @Post()
    createProduct(@Body(new ValidationPipe()) createProduct: CreateProductDto){
        return this.productsService.createProduct(createProduct)
    }

}