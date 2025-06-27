import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpException, ParseIntPipe, Query } from '@nestjs/common';
import { DeliveryPersonService } from './deliveryPerson.service';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { CreateDeliveryPersonDto } from './dto/CreateDeliveryPerson.dto';
import { UpdateLocationDeliveryPersonDto } from './dto/UpdateLocationDeliveryPerson.dto';
import { UpdateStatusDeliveryPersonDto } from './dto/UpdateStatusDeliveryPerson.dto';
import { FindByProximityDeliveryPersonDto } from './dto/FindByProximityDeliveryPerson.dto';
import { FindByZoneDto } from './dto/FindByZone.dto';
import { AssignZoneDeliveryPersonDto } from './dto/AssignZoneDeliveryPerson.dto';

@Controller('delivery')
export class DeliveryPersonController {
  constructor(private readonly deliveryPersonService: DeliveryPersonService) {}

  @Get()
  async findall(@Query()paginationDto:PaginationDto){
    try {
      return await this.deliveryPersonService.findAll(paginationDto);
  }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() createDeliveryPersonDto: CreateDeliveryPersonDto) {
    try {
      return await this.deliveryPersonService.create(createDeliveryPersonDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(":id/location")
  async updateLocation(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDeliveryPersonDto) {
    try {
      const deliveryPerson = await this.deliveryPersonService.updateLocation(+id, updateLocationDto)
      if (!deliveryPerson) {
        throw new HttpException("Delivery person not found", HttpStatus.NOT_FOUND)
      }
      return deliveryPerson
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  @Put(":id/status")
  async updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDeliveryPersonDto) {
    try {
      const deliveryPerson = await this.deliveryPersonService.updateStatus(+id, updateStatusDto)
      if (!deliveryPerson) {
        throw new HttpException("Delivery person not found", HttpStatus.NOT_FOUND)
      }
      return deliveryPerson
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('findByProximity')
  async findByProximity(@Body() findByProximityDto: FindByProximityDeliveryPersonDto) {
    try {
      return await this.deliveryPersonService.findByProximity(findByProximityDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('findByZone')
  async findByZone(@Body() findByZoneDto: FindByZoneDto) {
    try {
      return await this.deliveryPersonService.findByZone(findByZoneDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post(':id/assignZone')
  async assignZone(@Param('id') id: string, @Body() assignZoneDto: AssignZoneDeliveryPersonDto) {
    try {
      const deliveryPerson = await this.deliveryPersonService.assignZone(+id, assignZoneDto);
      if (!deliveryPerson) {
        throw new HttpException("Delivery person not found", HttpStatus.NOT_FOUND);
      }
      return deliveryPerson;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id/zones')
  async getZonesAssigned(@Param('id', ParseIntPipe) id: number) {
    try {
      const zones = await this.deliveryPersonService.getZonesAssigned(id);

      if (!zones.length) {
      throw new HttpException("No zones found for this delivery person", HttpStatus.NOT_FOUND);
      }

    return zones;
    } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Delete(":id/zone/:zoneId")
  async removeZone(@Param('id') id: string, @Param('zoneId') zoneId: string) {
    try {
      await this.deliveryPersonService.unassignZone(+id, +zoneId)
      return { message: "Zone removed from delivery" }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.deliveryPersonService.remove(+id);
      return { message: 'Delivery deleted' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



}
