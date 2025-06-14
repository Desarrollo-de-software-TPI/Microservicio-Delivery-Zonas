import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

export class AssignZoneDeliveryPerson {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Number)
    zoneIds: number[]; // Array de IDs de zonas
}