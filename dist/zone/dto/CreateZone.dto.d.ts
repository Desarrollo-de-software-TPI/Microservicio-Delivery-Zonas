import { LocationDto } from "../../common/dto/Location.dto";
export declare class CreateZone {
    name: string;
    location: LocationDto;
    radius: number;
    deliveryPersonId?: number;
}
