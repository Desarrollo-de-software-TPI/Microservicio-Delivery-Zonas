import { IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Location } from "./Location.dto";

export class UpdateLocationDeliveryPerson {
    @IsObject()
    @ValidateNested()
    @Type(() => Location)
    location: Location;
}