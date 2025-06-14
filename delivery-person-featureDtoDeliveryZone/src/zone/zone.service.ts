import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import  { In } from 'typeorm';
import { Zone } from './zone.entity';
//import type { CreateZoneDto, UpdateZoneDto, UpdatePartialZoneDto } from './zone.dto';
//mport type { Pagination } from '../pagination/pagination.dto';

//santi
import { PaginationDto } from '../pagination/pagination.dto';
import { CreateZone } from './dto/CreateZone.dto';
import { UpdateZone } from './dto/UpdateZone.dto';
import { UpdatePartialZone } from './dto/UpdatePartialZone.dto';
import { AssignZone } from './dto/AssignZone.dto';
import { Location } from 'src/location/Location.dto';
//santi
@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async findAll(Pagination: PaginationDto): Promise<{zones: Zone[]; total: number}> {
        const {limit, offset} = Pagination;

        const [zones, total] = await this.zoneRepository.findAndCount({
            take: limit,
            skip: offset,
        })
        return {zones, total};
    }


  async create(CreateZone: CreateZone): Promise<Zone> {
    const zone = this.zoneRepository.create(CreateZone);
    return this.zoneRepository.save(zone);
  }

  async findOne (id: number): Promise<Zone> {
    return this.zoneRepository.findOneOrFail({ where: { id } });
  }
  async findManyByIds(zoneIds: number[]): Promise<Zone[]> {
    return await this.zoneRepository.find({ where: { id: In(zoneIds) } });
  }
  
  async update(id: number, UpdateZone: UpdateZone): Promise<Zone | null> {
    await this.zoneRepository.update(id, UpdateZone);
    return this.zoneRepository.findOne({ where:{id} });
  }

  async updatePartial(id: number, UpdateZone: UpdatePartialZone): Promise<Zone | null> {
    await this.zoneRepository.update(id, UpdateZone);
    return this.zoneRepository.findOne({ where:{id} });
  }
  async remove(id: number): Promise<void> {
    await this.zoneRepository.delete(id);
  }


}