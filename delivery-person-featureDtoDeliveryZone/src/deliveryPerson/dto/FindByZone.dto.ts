import { IsNumber } from "class-validator";
import { PaginationDto } from "src/pagination/pagination.dto";

export class FindByZone extends PaginationDto {
    @IsNumber()
    zoneId: number;
}