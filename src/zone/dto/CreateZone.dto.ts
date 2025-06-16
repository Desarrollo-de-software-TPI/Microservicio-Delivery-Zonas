import {IsString, IsNumber, IsObject, ValidateNested, IsOptional } from "class-validator";
import {Type} from "class-transformer";
import {Location} from "../../location/Location.dto";


export class CreateZone {
    @IsString()
    name: string;

    @IsObject()
        @ValidateNested()
        @Type(() => Location)
        location: Location;
    
    @IsNumber()
    radius: number;

    @IsOptional()
    deliveryPersonId?: number; // Opcional, si se asigna una zona a un repartidor
}