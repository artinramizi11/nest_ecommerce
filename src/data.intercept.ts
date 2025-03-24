import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class DataIntercept implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        const loggedAt = new Date()
        return next.handle().pipe(map(data => {
            return {
                message:"Sucess",
                data,
                loggedAt
            }
        }))
    }
}