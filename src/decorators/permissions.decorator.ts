import { SetMetadata } from "@nestjs/common";
import { Permissions } from "src/enums/permissions.enum";

export const SetPermissions = (...permisions: Permissions[]) => SetMetadata("permissions", permisions)