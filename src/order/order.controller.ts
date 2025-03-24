import {  BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UnauthorizedException, UseGuards, ValidationPipe } from "@nestjs/common";
import { OrdersService } from "./order.service";
import { CreateOrderDto } from "src/dto/create_order.dto";
import { CreateAddressDto } from "src/dto/create_address.dto";
import { UpdateAddressDto } from "src/dto/update_address.dto";
import { SetPermissions } from "src/permissions.decorator";
import { Permissions } from "src/enums/permissions.enum";
import { AuthorizationGuard } from "src/authorization.guard";

@Controller("orders")
export class OrderController {

    constructor(
        private ordersService: OrdersService
    ){}

    @SetPermissions(Permissions.view_orders)
    @UseGuards(AuthorizationGuard)
    @Get()
    getAllOrders(){
        return this.ordersService.findAll()
    }

    @Post()
    createOrder(@Body(new ValidationPipe()) createOrder: CreateOrderDto) {
        if(createOrder.products.length === 0) throw new BadRequestException("No orders found")
         const productIds = createOrder.products?.map((product) => product.id)
        const hasSameProduct = new Set(productIds).size !== productIds.length
        if(hasSameProduct) throw new BadRequestException("You can not add the same product twice")
        return this.ordersService.createOrder(createOrder)
    }

    @Post(":id/address")
    createAddressForOrder(
        @Param("id") orderId:number, 
        @Body(new ValidationPipe()) createAddress: CreateAddressDto){
        return this.ordersService.createAddressForOrderId(orderId,createAddress)
    }

    @Patch(":id/address")
    updateAddressForOrderId(
        @Param("id",ParseIntPipe) orderId: number,
        @Body(new ValidationPipe()) updateAddress: UpdateAddressDto
    ){
        return this.ordersService.updateAddressForOrderId(orderId,updateAddress)

    }

    @Get(":id")
    getOrderById(@Param("id",ParseIntPipe) id: number){
        return this.ordersService.getOrderById(id)
    }

    @Delete(":id")
    removeOrder(@Param("id", ParseIntPipe) id: number){
        return this.ordersService.removeOrderById(id)
    }

}