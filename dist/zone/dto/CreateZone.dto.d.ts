import { Location } from "../../location/Location.dto";
export declare class CreateZone {
    name: string;
    location: Location;
    radius: number;
    deliveryPersonId?: number;
}
