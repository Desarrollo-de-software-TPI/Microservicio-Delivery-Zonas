import type { Repository } from 'typeorm';
import { Zone } from './zone.entity';
import { CreateZoneDto } from './dto/CreateZone.dto';
import { UpdateZoneDto } from './dto/UpdateZone.dto';
import { UpdatePartialZoneDto } from './dto/UpdatePartialZone.dto';
import type { PaginationDto } from '../pagination/pagination.dto';
export declare class ZoneService {
    private readonly zoneRepository;
    constructor(zoneRepository: Repository<Zone>);
    findAll(paginationDto: PaginationDto): Promise<{
        zones: Zone[];
        total: number;
    }>;
    create(CreateZoneDto: CreateZoneDto): Promise<Zone>;
    findOne(id: number): Promise<Zone>;
    findManyByIds(zoneIds: number[]): Promise<Zone[]>;
    update(id: number, updateZoneDto: UpdateZoneDto): Promise<Zone | null>;
    updatePartial(id: number, updateZoneDto: UpdatePartialZoneDto): Promise<Zone | null>;
    remove(id: number): Promise<void>;
}
