import { Type } from "class-transformer";
import { IsNumber, IsObject, ValidateNested } from "class-validator";
import { Location } from "./Location.dto";

export class CreateDeliveryPerson {
    @IsNumber()
    personId: number;

    @IsObject()
    @ValidateNested()
    @Type(() => Location)
    location: Location;

    @IsNumber()
    radius: number; // Radio en km cuadrado que cubre la zona
}