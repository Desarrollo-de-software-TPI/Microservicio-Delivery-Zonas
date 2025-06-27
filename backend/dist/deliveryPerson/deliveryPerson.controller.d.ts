import { DeliveryPersonService } from './deliveryPerson.service';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { CreateDeliveryPersonDto } from './dto/CreateDeliveryPerson.dto';
import { UpdateLocationDeliveryPersonDto } from './dto/UpdateLocationDeliveryPerson.dto';
import { UpdateStatusDeliveryPersonDto } from './dto/UpdateStatusDeliveryPerson.dto';
import { FindByProximityDeliveryPersonDto } from './dto/FindByProximityDeliveryPerson.dto';
import { FindByZoneDto } from './dto/FindByZone.dto';
import { AssignZoneDeliveryPersonDto } from './dto/AssignZoneDeliveryPerson.dto';
export declare class DeliveryPersonController {
    private readonly deliveryPersonService;
    constructor(deliveryPersonService: DeliveryPersonService);
    findall(paginationDto: PaginationDto): Promise<{
        deliveries: import("./deliveryPerson.entity").DeliveryPersonEntity[];
        total: number;
    }>;
    create(createDeliveryPersonDto: CreateDeliveryPersonDto): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity>;
    updateLocation(id: string, updateLocationDto: UpdateLocationDeliveryPersonDto): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDeliveryPersonDto): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity>;
    findByProximity(findByProximityDto: FindByProximityDeliveryPersonDto): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity[]>;
    findByZone(findByZoneDto: FindByZoneDto): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity[]>;
    assignZone(id: string, assignZoneDto: AssignZoneDeliveryPersonDto): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity>;
    getZonesAssigned(id: number): Promise<import("../zone/zone.entity").Zone[]>;
    removeZone(id: string, zoneId: string): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
