import { Type } from "class-transformer";
import { IsNumber, IsObject, ValidateNested } from "class-validator";
import { PaginationDto } from "src/pagination/pagination.dto";
import { Location } from "./Location.dto";

export class FindByProximityDeliveryPerson extends PaginationDto {
    @IsObject()
    @ValidateNested()
    @Type(() => Location)
    location: Location;

    @IsNumber()
    radius: number; // Radio en km
}