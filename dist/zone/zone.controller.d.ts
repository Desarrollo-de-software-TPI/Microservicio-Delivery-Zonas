import { ZoneService } from './zone.service';
import { Zone } from './zone.entity';
import { CreateZoneDto } from './dto/CreateZone.dto';
import { PaginationDto } from '../pagination/pagination.dto';
export declare class ZoneController {
    private readonly zoneService;
    constructor(zoneService: ZoneService);
    findAll(paginationDto: PaginationDto): Promise<{
        zones: Zone[];
        total: number;
    }>;
    create(createZoneDto: CreateZoneDto): Promise<Zone>;
    findOne(id: string): Promise<Zone>;
    update(id: string, updateZoneDto: CreateZoneDto): Promise<Zone>;
    updatePartial(id: string, updateZoneDto: CreateZoneDto): Promise<Zone>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
