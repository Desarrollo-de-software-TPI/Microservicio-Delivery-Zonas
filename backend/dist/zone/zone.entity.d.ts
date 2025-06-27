import { BaseEntity } from "typeorm";
import { DeliveryPersonEntity } from "../deliveryPerson/deliveryPerson.entity";
export declare class Zone extends BaseEntity {
    id: number;
    name: string;
    location: {
        lat: number;
        lng: number;
    };
    radius: number;
    deliveryPerson: DeliveryPersonEntity[];
}
