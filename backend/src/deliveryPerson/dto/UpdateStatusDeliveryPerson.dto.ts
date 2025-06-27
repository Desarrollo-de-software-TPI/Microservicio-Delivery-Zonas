import { IsEnum } from "class-validator";
import { DeliveryPersonStatus } from "../deliveryPerson.entity";

export class UpdateStatusDeliveryPersonDto {
    @IsEnum(DeliveryPersonStatus)
    status: DeliveryPersonStatus;
}