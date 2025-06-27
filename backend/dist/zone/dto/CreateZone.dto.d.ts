import { Location } from "../../location/Location.dto";
export declare class CreateZoneDto {
    name: string;
    location: Location;
    radius: number;
    deliveryPersonId?: number;
}
