import { PaginationDto } from "src/pagination/pagination.dto";
import { Location } from "../../location/Location.dto";
export declare class FindByProximityDeliveryPersonDto extends PaginationDto {
    location: Location;
    radius: number;
}
