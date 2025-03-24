import { IsInt, IsString } from "class-validator";
import { CreateAddressDto } from "./create_address.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
