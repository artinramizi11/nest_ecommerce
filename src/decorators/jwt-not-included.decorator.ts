import { SetMetadata } from "@nestjs/common";

export const JwtNotIncluded = () => SetMetadata("jwt-not-included", true)