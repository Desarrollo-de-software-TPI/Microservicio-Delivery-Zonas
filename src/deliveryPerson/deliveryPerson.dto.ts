import { IsNumber, IsObject, IsEnum, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { DeliveryPersonStatus } from "../deliveryPerson/deliveryPerson.entity";
import {PaginationDto} from "../pagination/pagination.dto"

export class LocationDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;
}

export class CreateDeliveryPersonDto {
    
    
    @IsNumber()
    personId: number;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @IsNumber()
    radius: number; // Radio en km cuadrado que cubre la zona
}

export class UpdateLocationDeliveryPersonDto {
    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;
}

export class UpdateStatusDeliveryPersonDto {
    @IsEnum(DeliveryPersonStatus)
    status: DeliveryPersonStatus;
}

export class FindByProximityDeliveryPersonDto extends PaginationDto {
    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @IsNumber()
    radius: number; // Radio en km
}


export class FindByZoneDto extends PaginationDto {
    @IsNumber()
    zoneId: number
  }

export class AssignZoneDeliveryPersonDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Number)
    zoneIds: number[]; // Array de IDs de zonas
}

