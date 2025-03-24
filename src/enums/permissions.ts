import { Permissions } from "./permissions.enum"
import { Roles } from "./roles.enum"

const CustomerPermissions = [Permissions.create_order, Permissions.create_address , Permissions.update_address , Permissions.view_order_id]
const AdminPermissions = [...CustomerPermissions, Permissions.delete_order_id, Permissions.view_orders,Permissions.view_products]
const OwnerPermissions = Object.values(Permissions)

export const all_permissions = {
[Roles.Customer]: [...CustomerPermissions],
[Roles.Admin]: [...AdminPermissions],
[Roles.Owner]: [...OwnerPermissions]
}

