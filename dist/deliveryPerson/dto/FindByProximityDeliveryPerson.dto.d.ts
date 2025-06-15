import { PaginationDto } from "src/pagination/pagination.dto";
import { Location } from "../../location/Location.dto";
export declare class FindByProximityDeliveryPerson extends PaginationDto {
    location: Location;
    radius: number;
}
