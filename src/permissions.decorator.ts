import { SetMetadata } from "@nestjs/common";
import { Permissions } from "./enums/permissions.enum";

export const SetPermissions = (...permisions: Permissions[]) => SetMetadata("permissions", permisions)