import {IsString, IsNumber, IsObject, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {Location} from "../../location/Location.dto";

export class UpdatePartialZoneDto {
    @IsString()
    name?: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Location)
    location: Location;
    
    @IsNumber()
    radius?: number;
}