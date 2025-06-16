import {ValidateNested, IsArray} from "class-validator";
import { Type } from "class-transformer";

export class AssignZoneDto{
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Number) // Convierte cada elemento a número
    zoneIds: number[];
}