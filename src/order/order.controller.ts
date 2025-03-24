import {  BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { OrdersService } from "./order.service";
import { CreateOrderDto } from "src/dto/create_order.dto";
import { CreateAddressDto } from "src/dto/create_address.dto";
import { UpdateAddressDto } from "src/dto/update_address.dto";
import { Permissions } from "src/enums/permissions.enum";
import { ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/enums/roles.enum";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { SetPermissions } from "src/decorators/permissions.decorator";
import { SetRoles } from "src/decorators/roles.decorator";

@Controller("orders")
export class OrderController {

    constructor(
        private ordersService: OrdersService
    ){}

    @ApiOperation({summary: "Get all orders"})
    @SetPermissions(Permissions.view_orders)
    @UseGuards(AuthorizationGuard)
    @Get()
    getAllOrders(){
        return this.ordersService.findAll()
    }

    @ApiOperation({summary: "Create new order"})
    @SetPermissions(Permissions.create_order)
    @Post()
    createOrder(@Body(new ValidationPipe()) createOrder: CreateOrderDto) {
        if(createOrder.products.length === 0) throw new BadRequestException("No orders found")
         const productIds = createOrder.products?.map((product) => product.id)
        const hasSameProduct = new Set(productIds).size !== productIds.length
        if(hasSameProduct) throw new BadRequestException("You can not add the same product twice")
        return this.ordersService.createOrder(createOrder)
    }

    @ApiOperation({summary: "Create address for the order id"})
    @SetPermissions(Permissions.create_address)
    @Post(":id/address")
    createAddressForOrder(
        @Param("id") orderId:number, 
        @Body(new ValidationPipe()) createAddress: CreateAddressDto){
        return this.ordersService.createAddressForOrderId(orderId,createAddress)
    }

    @SetPermissions(Permissions.update_address)
    @ApiOperation({summary:"Update address for the order id"})
    @Patch(":id/address")
    updateAddressForOrderId(
        @Param("id",ParseIntPipe) orderId: number,
        @Body(new ValidationPipe()) updateAddress: UpdateAddressDto
    ){
        return this.ordersService.updateAddressForOrderId(orderId,updateAddress)

    }

    @SetPermissions(Permissions.view_order_id)
    @ApiOperation({summary: "Get order by id"})
    @Get(":id")
    getOrderById(@Param("id",ParseIntPipe) id: number){
        return this.ordersService.getOrderById(id)
    }

    @SetRoles(Roles.Owner)
    @SetPermissions(Permissions.delete_order_id)
    @ApiOperation({summary: "Delete order by id"})
    @Delete(":id")
    removeOrder(@Param("id", ParseIntPipe) id: number){
        return this.ordersService.removeOrderById(id)
    }

}