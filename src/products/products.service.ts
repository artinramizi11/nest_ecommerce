import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "src/dto/create_product";
import { Category } from "src/entities/category.entity";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private ProductRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ){}

    async getProducts(){
        return this.ProductRepository.find()
    }

    async createProduct(newProduct: CreateProductDto){
        const productExists = await this.ProductRepository.findOne({where: {name: newProduct.name}})
        if(productExists){
            throw new UnauthorizedException("We have already this product")
        }
        const categoryExists = await this.categoryRepository.findOne({where: {id: newProduct.categoryId}})
        if(!categoryExists){
            throw new UnauthorizedException("We dont have this category")
        }
        const product = await this.ProductRepository.create({
            ...newProduct
        })
        return await this.ProductRepository.save(product)
        
    }

}