import { DeliveryPersonService } from './deliveryPerson.service';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { CreateDeliveryPerson } from './dto/CreateDeliveryPerson.dto';
import { UpdateLocationDeliveryPerson } from './dto/UpdateLocationDeliveryPerson.dto';
import { UpdateStatusDeliveryPerson } from './dto/UpdateStatusDeliveryPerson.dto';
import { FindByProximityDeliveryPerson } from './dto/FindByProximityDeliveryPerson.dto';
import { FindByZone } from './dto/FindByZone.dto';
import { AssignZoneDeliveryPerson } from './dto/AssignZoneDeliveryPerson.dto';
export declare class DeliveryPersonController {
    private readonly deliveryPersonService;
    constructor(deliveryPersonService: DeliveryPersonService);
    findall(paginationDto: PaginationDto): Promise<{
        deliveries: import("./deliveryPerson.entity").DeliveryPersonEntity[];
        total: number;
    }>;
    create(CreateDeliveryPerson: CreateDeliveryPerson): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity>;
    updateLocation(id: string, updateLocationDto: UpdateLocationDeliveryPerson): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDeliveryPerson): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity>;
    findByProximity(findByProximityDto: FindByProximityDeliveryPerson): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity[]>;
    findByZone(FindByZone: FindByZone): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity[]>;
    assignZone(id: string, assignZoneDto: AssignZoneDeliveryPerson): Promise<import("./deliveryPerson.entity").DeliveryPersonEntity>;
    getZonesAssigned(id: number): Promise<import("../zone/zone.entity").Zone[]>;
    removeZone(id: string, zoneId: string): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
