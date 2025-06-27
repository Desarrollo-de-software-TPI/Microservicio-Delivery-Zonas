import { IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Location } from "../../location/Location.dto";

export class UpdateLocationDeliveryPersonDto {
    @IsObject()
    @ValidateNested()
    @Type(() => Location)
    location: Location;
}