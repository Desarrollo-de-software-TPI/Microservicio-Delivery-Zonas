import { IsString, IsNumber, IsObject, ValidateNested, IsArray, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class LocationDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;
}
export class CreateZoneDto {
    //no corroboro el id porque es autogenerado por la base de datos
    // @IsNumber()
    // id: number;
    @IsString()
    name: string;

    
    @IsObject()
        @ValidateNested()
        @Type(() => LocationDto)
        location: LocationDto;
    
    @IsNumber()
    radius: number;

    @IsOptional()
    deliveryPersonId?: number; // Opcional, si se asigna una zona a un repartidor
}

export class UpdateZoneDto extends CreateZoneDto {}
//La clase UpdateZoneDto extiende de CreateZoneDto porque quiero que tenga las mismas propiedades.

export class UpdatePartialZoneDto {
    @IsString()
    name?: string;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;
    
    @IsNumber()
    radius?: number;
}
export class AssignZoneDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Number) // Convierte cada elemento a número
    zoneIds: number[];
}
