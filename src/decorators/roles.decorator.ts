import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/enums/roles.enum";

export const SetRoles = (...Roles: Roles[]) => SetMetadata("roles", Roles )