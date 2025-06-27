import { Repository } from 'typeorm';
import { DeliveryPersonEntity, DeliveryPersonStatus } from './deliveryPerson.entity';
import { Zone } from 'src/zone/zone.entity';
import { ZoneService } from '../zone/zone.service';
import { CreateDeliveryPersonDto } from './dto/CreateDeliveryPerson.dto';
import { UpdateLocationDeliveryPersonDto } from './dto/UpdateLocationDeliveryPerson.dto';
import { UpdateStatusDeliveryPersonDto } from './dto/UpdateStatusDeliveryPerson.dto';
import { FindByProximityDeliveryPersonDto } from './dto/FindByProximityDeliveryPerson.dto';
import { FindByZoneDto } from './dto/FindByZone.dto';
import { AssignZoneDeliveryPersonDto } from './dto/AssignZoneDeliveryPerson.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';
export declare class DeliveryPersonService {
    private readonly deliveryPersonRepository;
    private readonly zoneService;
    constructor(deliveryPersonRepository: Repository<DeliveryPersonEntity>, zoneService: ZoneService);
    findAll(paginationDto: PaginationDto): Promise<{
        deliveries: DeliveryPersonEntity[];
        total: number;
    }>;
    findById(id: number): Promise<DeliveryPersonEntity>;
    create(createDeliveryPersonDto: CreateDeliveryPersonDto): Promise<DeliveryPersonEntity>;
    updateLocation(id: number, updateLocationDto: UpdateLocationDeliveryPersonDto): Promise<DeliveryPersonEntity>;
    updateStatus(id: number, updateStatusDto: UpdateStatusDeliveryPersonDto): Promise<DeliveryPersonEntity>;
    findByProximity(findByProximityDto: FindByProximityDeliveryPersonDto): Promise<DeliveryPersonEntity[]>;
    findByZone(findByZoneDto: FindByZoneDto): Promise<DeliveryPersonEntity[]>;
    assignZone(id: number, assignZoneDto: AssignZoneDeliveryPersonDto): Promise<DeliveryPersonEntity | null>;
    getZonesAssigned(deliveryPersonId: number): Promise<Zone[]>;
    unassignZone(deliveryPersonId: number, zoneId: number): Promise<DeliveryPersonEntity>;
    remove(id: number): Promise<void>;
    findByStatus(status: DeliveryPersonStatus): Promise<DeliveryPersonEntity[]>;
    findByLocation(location: {
        lat: number;
        lng: number;
    }): Promise<DeliveryPersonEntity[]>;
    findByPersonId(personId: number): Promise<DeliveryPersonEntity[]>;
    private calculateDistance;
    private deg2rad;
}
