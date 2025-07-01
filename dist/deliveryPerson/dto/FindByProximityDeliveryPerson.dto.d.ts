import { PaginationDto } from "src/common/pagination/pagination.dto";
import { LocationDto } from "../../common/dto/Location.dto";
export declare class FindByProximityDeliveryPerson extends PaginationDto {
    location: LocationDto;
    radius: number;
}
