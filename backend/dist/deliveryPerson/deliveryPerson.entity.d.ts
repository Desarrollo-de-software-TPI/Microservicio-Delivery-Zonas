import { BaseEntity } from "typeorm";
import { Zone } from "../zone/zone.entity";
export declare enum DeliveryPersonStatus {
    AVAILABLE = "available",
    IN_ROUTE = "in_route",
    DELIVERING = "delivering",
    WAITING_FOR_ORDER = "waiting_for_order",
    UNAVAILABLE = "unavailable",
    WITH_ISSUE = "with_issue",
    OFFLINE = "offline"
}
export declare class DeliveryPersonEntity extends BaseEntity {
    id: number;
    personId: number;
    location: {
        lat: number;
        lng: number;
    };
    radius: number;
    status: DeliveryPersonStatus;
    zones: Zone[];
}
