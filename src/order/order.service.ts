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
import { Repository } from "typeorm";

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(OrderItem) private ordersItemRepository: Repository<OrderItem>,
        @InjectRepository(Address) private addressRepository: Repository<Address>
    ){}

    async findAll(){
        return await this.ordersRepository.find()
    }

    async createOrder(createOrder: CreateOrderDto): Promise<Order>{

        const user = await this.usersRepository.findOne({where: {id: createOrder.userId}})

        if(!user){
            throw new HttpException("No user found with this id", HttpStatus.NOT_FOUND)
        }

        const productsExists = await Promise.all(createOrder.products.map(async (product) => {
            const findProduct = await this.productsRepository.findOne({
                where: {
                    id: product.id,
                    name: product.name,
                   },
            })
            if(findProduct){
                if(findProduct.stock < product.quantity) throw new UnauthorizedException("We dont have in stock this quantity")
                findProduct.stock -= product.quantity
                await this.productsRepository.save(findProduct)
            }
           
        }))

        if((productsExists).some((pr) => pr === null)){
            throw new HttpException("Some products dont exists on our database", HttpStatus.BAD_REQUEST)
        }

        const orderedItems = Promise.all(createOrder.products.map(async (product) => {
            const newItem = this.ordersItemRepository.create({
                product: {
                    id: product.id,
                    name: product.name
                },
                quantity: product.quantity
            })
            return this.ordersItemRepository.save(newItem)  
           
        }))

        const newOrder = this.ordersRepository.create({
            user: user,
            ordered_products: (await orderedItems)
        })

        await this.ordersRepository.save(newOrder)
       
        return newOrder

    

}

async createAddressForOrderId(orderId: number, address: CreateAddressDto): Promise<Address> {
    const order = await this.ordersRepository.findOne({where: {id: orderId}})

    if(!order){
        throw new BadRequestException("No order found for this order ID")
    }

    if(order.address) throw new BadRequestException("This order already have already set address")

    const createAddress = this.addressRepository.create({
        order: {id: orderId},
        postal_code: address.postal_code,
        city: address.city,
    country: address.country,
    house_number: address.house_number
})

return await this.addressRepository.save(createAddress)
}

async updateAddressForOrderId(orderId: number, update_address?: UpdateAddressDto): Promise<Address>{
    const order = await this.ordersRepository.findOne({where: {id: orderId}})
    if(!order) throw new NotFoundException("No order found with this ID")
    const address = await this.addressRepository.findOne({where: {order: {id: orderId}}})
    if(!address) throw new BadRequestException("there is no addresses to update")

        if(!update_address) {
            Object.assign(address, update_address)
            return await this.addressRepository.save(address)
        }
        throw new BadRequestException("Nothing to update")
    
}

async getOrderById(id: number): Promise<Order>{
    const order = await this.ordersRepository.findOneBy({id})
    if(!order) throw new NotFoundException()
    return order
}

async removeOrderById(id: number){
    const order = await this.ordersRepository.findOne({where: {id}})

    if(!order) throw new NotFoundException("No order found with this ID")

      await this.ordersRepository.remove(order)

      return {message:"Order sucessfully deleted"}
}


}