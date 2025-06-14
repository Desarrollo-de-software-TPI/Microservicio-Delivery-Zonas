import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import  { Repository } from 'typeorm';
import { DeliveryPersonEntity, DeliveryPersonStatus } from './deliveryPerson.entity';
import { Zone} from 'src/zone/zone.entity';
import { ZoneService } from '../zone/zone.service'; 
import type {
  CreateDeliveryPersonDto,
  UpdateLocationDeliveryPersonDto,
  UpdateStatusDeliveryPersonDto,
  FindByProximityDeliveryPersonDto,
  FindByZoneDto,
  AssignZoneDeliveryPersonDto,
} from "./deliveryPerson.dto"
import { PaginationDto } from 'src/pagination/pagination.dto';
@Injectable()
export class DeliveryPersonService {
  constructor(
    @InjectRepository(DeliveryPersonEntity)
    private readonly deliveryPersonRepository: Repository<DeliveryPersonEntity>,
  
    private readonly zoneService: ZoneService, 

  ) {}

  async findAll(paginationDto:PaginationDto): Promise<{deliveries: DeliveryPersonEntity[]; total: number}> {
     const {limit, offset} = paginationDto;

        const [deliveries, total] = await this.deliveryPersonRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['zones'],
        })
        return {deliveries, total};
  }

  async findById(id: number): Promise<DeliveryPersonEntity> {
    return await this.deliveryPersonRepository.findOneOrFail({ where: { id } });
  }

  async create(createDeliveryPersonDto: CreateDeliveryPersonDto): Promise<DeliveryPersonEntity> {
    const deliveryPerson = this.deliveryPersonRepository.create(createDeliveryPersonDto)
    return await this.deliveryPersonRepository.save(deliveryPerson);
  }

  

  async updateLocation(id: number, updateLocationDto: UpdateLocationDeliveryPersonDto): Promise<DeliveryPersonEntity> {
    await this.deliveryPersonRepository.update(id, updateLocationDto)
    return this.deliveryPersonRepository.findOneOrFail({ where: { id } })
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDeliveryPersonDto): Promise<DeliveryPersonEntity> {
    await this.deliveryPersonRepository.update(id, updateStatusDto)
    return this.deliveryPersonRepository.findOneOrFail({ where: { id } })
  }
  /*
  async updateLocation(deliveryPersonId: number, location: { lat: number; lng: number }): Promise<DeliveryPersonEntity> {
      const deliveryPerson = await this.deliveryPersonRepository.findOneOrFail({ where: { id: deliveryPersonId } });
      deliveryPerson.location = location;
      return await this.deliveryPersonRepository.save(deliveryPerson);
  } 
  
  async updateStatus(deliveryPersonId: number, status: DeliveryPersonStatus): Promise<DeliveryPersonEntity> {
    const deliveryPerson = await this.deliveryPersonRepository.findOneOrFail({ where: { id: deliveryPersonId } });
    deliveryPerson.status = status;
    return await this.deliveryPersonRepository.save(deliveryPerson);
  }
  */
  async findByProximity(findByProximityDto: FindByProximityDeliveryPersonDto): Promise<DeliveryPersonEntity[]> {
    const { location, radius } = findByProximityDto

    // Get all delivery persons
    const allDeliveryPersons = await this.deliveryPersonRepository.find()

    // Calculate distance and filter by radius
    const filteredDeliveryPersons = allDeliveryPersons.filter((deliveryPerson) => {
      const distance = this.calculateDistance(
        location.lat,
        location.lng,
        deliveryPerson.location.lat,
        deliveryPerson.location.lng,
      )
      return distance <= radius
    })

    // Sort by distance
    filteredDeliveryPersons.sort((a, b) => {
      const distanceA = this.calculateDistance(location.lat, location.lng, a.location.lat, a.location.lng)
      const distanceB = this.calculateDistance(location.lat, location.lng, b.location.lat, b.location.lng)
      return distanceA - distanceB
    })

    return filteredDeliveryPersons
  }

  async findByZone(findByZoneDto: FindByZoneDto): Promise<DeliveryPersonEntity[]> {
    const { zoneId } = findByZoneDto

    // Find all delivery persons with the specified zone
    const deliveryPersons = await this.deliveryPersonRepository
      .createQueryBuilder("deliveryPerson")
      .leftJoinAndSelect("deliveryPerson.zones", "zone")
      .where("zone.id = :zoneId", { zoneId })
      .getMany()

    return deliveryPersons
  }

  async assignZone(id: number, assignZoneDto: AssignZoneDeliveryPersonDto): Promise<DeliveryPersonEntity | null> {
    const { zoneIds } = assignZoneDto;

    // Buscar el repartidor
    const deliveryPerson = await this.deliveryPersonRepository.findOne({
        where: { id },
        relations: ["zones"], 
    });

    if (!deliveryPerson) {
        return null;
    }

    // Buscar múltiples zonas con `findManyByIds()`
    const zones = await this.zoneService.findManyByIds(zoneIds); 

    // aca se asignan las zonas al repartidor
    deliveryPerson.zones = [...(deliveryPerson.zones || []), ...zones];

    return this.deliveryPersonRepository.save(deliveryPerson);
}
   /*
  async getZones(id: number): Promise<Zone[] | null> {
    const deliveryPerson = await this.deliveryPersonRepository.findOne({
      where: { id },
      relations: ["zones"],
    })

    if (!deliveryPerson) {
      return null
    }

    return deliveryPerson.zone
  }
 */
  
  async getZonesAssigned(deliveryPersonId: number): Promise<Zone[]> {
    const deliveryPerson = await this.deliveryPersonRepository.findOne({
      where: { id: deliveryPersonId},
      relations: ['zones'], // Cargamos la relación con zonas
    });
  
    if (!deliveryPerson) {
      throw new Error(`Delivery person with ID ${deliveryPersonId} not found`);
    }
  
    return deliveryPerson.zones;
  }


  async unassignZone(deliveryPersonId: number, zoneId: number): Promise<DeliveryPersonEntity> {
    const deliveryPerson = await this.deliveryPersonRepository.findOneOrFail({ where: { id: deliveryPersonId } });
    const zone = await this.deliveryPersonRepository.manager.getRepository(Zone).findOneOrFail({ where: { id: zoneId } });
    deliveryPerson.zones = deliveryPerson.zones.filter(z => z.id !== zone.id);
    return await this.deliveryPersonRepository.save(deliveryPerson);
  }


  async remove(id: number): Promise<void> {
    await this.deliveryPersonRepository.delete(id);
  }
  /*
  async removeZone(id: number, zoneId: number): Promise<void> {
    const deliveryPerson = await this.deliveryPersonRepository.findOne({
      where: { id },
      relations: ["zones"],
    })

    if (!deliveryPerson) {
      throw new Error("Delivery person not found")
    }

    deliveryPerson.zones = deliveryPerson.zones.filter((zone) => zone.id !== zoneId)

    await this.deliveryPersonRepository.save(deliveryPerson)
  }
  */
  async findByStatus(status: DeliveryPersonStatus): Promise<DeliveryPersonEntity[]> {
    return await this.deliveryPersonRepository.find({ where: { status } });
  }

  async findByLocation(location: { lat: number; lng: number }): Promise<DeliveryPersonEntity[]> {
    return await this.deliveryPersonRepository.find({ where: { location } });
  }

  async findByPersonId(personId: number): Promise<DeliveryPersonEntity[]> {
    return await this.deliveryPersonRepository.find({ where: { personId } });
  }


  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    return distance
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }
}