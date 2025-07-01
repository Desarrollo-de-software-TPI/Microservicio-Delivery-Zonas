import { Type } from "class-transformer";
import { IsNumber, IsObject, ValidateNested } from "class-validator";
import { PaginationDto } from "src/common/pagination/pagination.dto";
import { LocationDto } from "../../common/dto/Location.dto";

export class FindByProximityDeliveryPerson extends PaginationDto {
    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @IsNumber()
    radius: number; // Radio en km
}