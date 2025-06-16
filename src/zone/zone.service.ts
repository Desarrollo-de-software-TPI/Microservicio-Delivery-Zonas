import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import  { In } from 'typeorm';
import { Zone } from './zone.entity';
import { AssignZoneDto } from './dto/AssignZone.dto';
import { CreateZoneDto } from './dto/CreateZone.dto';
import { UpdateZoneDto } from './dto/UpdateZone.dto';
import { UpdatePartialZoneDto } from './dto/UpdatePartialZone.dto';
import type { PaginationDto } from '../pagination/pagination.dto';


@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<{zones: Zone[]; total: number}> {
        const {limit, offset} = paginationDto;

        const [zones, total] = await this.zoneRepository.findAndCount({
            take: limit,
            skip: offset,
        })
        return {zones, total};
    }


  async create(CreateZoneDto: CreateZoneDto): Promise<Zone> {
    const zone = this.zoneRepository.create(CreateZoneDto);
    return this.zoneRepository.save(zone);
  }

  async findOne (id: number): Promise<Zone> {
    return this.zoneRepository.findOneOrFail({ where: { id } });
  }
  async findManyByIds(zoneIds: number[]): Promise<Zone[]> {
    return await this.zoneRepository.find({ where: { id: In(zoneIds) } });
  }
  
  async update(id: number, updateZoneDto: UpdateZoneDto): Promise<Zone | null> {
    await this.zoneRepository.update(id, updateZoneDto);
    return this.zoneRepository.findOne({ where:{id} });
  }

  async updatePartial(id: number, updateZoneDto: UpdatePartialZoneDto): Promise<Zone | null> {
    await this.zoneRepository.update(id, updateZoneDto);
    return this.zoneRepository.findOne({ where:{id} });
  }
  async remove(id: number): Promise<void> {
    await this.zoneRepository.delete(id);
  }


}
