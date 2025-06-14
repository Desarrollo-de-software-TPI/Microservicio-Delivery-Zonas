import {IsNumber} from "class-validator";

export class Location {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;
}