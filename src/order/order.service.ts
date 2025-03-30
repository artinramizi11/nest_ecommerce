import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAddressDto } from "src/dto/create_address.dto";
import { CreateOrderDto } from "src/dto/create_order.dto";
import { UpdateAddressDto } from "src/dto/update_address.dto";
import { Address } from "src/entities/address.entity";
import { Order } from "src/entities/order.entity";
import { OrderItem } from "src/entities/orderItem.entity";
import { Product } from "src/entities/product.entity";
import { User } from "src/entities/user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class OrdersService {

    constructor(
       private dataSource: DataSource
    ){}

    async findAll(){
        return await this.dataSource.getRepository(Order).find()
    }

    async createOrder(createOrder: CreateOrderDto): Promise<Order>{

        const user = await this.dataSource.getRepository(User).findOne({where: {id: createOrder.userId}})

        if(!user){
            throw new HttpException("No user found with this id", HttpStatus.NOT_FOUND)
        }

        const productsExists = await Promise.all(createOrder.products.map(async (product) => {
            const findProduct = await this.dataSource.getRepository(Product).findOne({
                where: {
                    id: product.id,
                    name: product.name,
                   },
            })
            if(findProduct){
                if(findProduct.stock < product.quantity) throw new UnauthorizedException("We dont have in stock this quantity")
                findProduct.stock -= product.quantity
                await this.dataSource.getRepository(Product).save(findProduct)
            }
           
        }))

        if((productsExists).some((pr) => pr === null)){
            throw new HttpException("Some products dont exists on our database", HttpStatus.BAD_REQUEST)
        }

        const orderedItems = await this.createOrderedItems(createOrder)

        const newOrder = this.dataSource.getRepository(Order).create({
            user: user,
            ordered_products: (await orderedItems)
        })

        await this.dataSource.getRepository(Order).save(newOrder)
       
        return newOrder
}

async createOrderedItems(createOrder: CreateOrderDto){
    const orderedItems = await Promise.all(createOrder.products.map(async (product) => {
        const newItem = this.dataSource.getRepository(OrderItem).create({
            product: {
                id: product.id,
                name: product.name
            },
            quantity: product.quantity
        })
        return this.dataSource.getRepository(OrderItem).save(newItem)  
       
    }))
    return orderedItems
}

async createAddressForOrderId(orderId: number, address: CreateAddressDto): Promise<Address> {
    const order = await this.dataSource.getRepository(Order).findOne({where: {id: orderId}})

    if(!order){
        throw new BadRequestException("No order found for this order ID")
    }

    if(order.address) throw new BadRequestException("This order already have already set address")

    const createAddress = this.dataSource.getRepository(Address).create({
        order: {id: orderId},
        postal_code: address.postal_code,
        city: address.city,
    country: address.country,
    house_number: address.house_number
})

return await this.dataSource.getRepository(Address).save(createAddress)
}

async updateAddressForOrderId(orderId: number, update_address?: UpdateAddressDto): Promise<Address>{
    const order = await this.dataSource.getRepository(Order).findOne({where: {id: orderId}})
    if(!order) throw new NotFoundException("No order found with this ID")
    const address = await this.dataSource.getRepository(Address).findOne({where: {order: {id: orderId}}})
    if(!address) throw new BadRequestException("there is no addresses to update")

        if(!update_address) {
            Object.assign(address, update_address)
            return await this.dataSource.getRepository(Address).save(address)
        }
        throw new BadRequestException("Nothing to update")
    
}

async getOrderById(id: number): Promise<Order>{
    const order = await this.dataSource.getRepository(Order).findOneBy({id})
    if(!order) throw new NotFoundException()
    return order
}

async removeOrderById(id: number){
    const order = await this.dataSource.getRepository(Order).findOne({where: {id}})

    if(!order) throw new NotFoundException("No order found with this ID")

      await this.dataSource.getRepository(Order).remove(order)

      return {message:"Order sucessfully deleted"}
}


}