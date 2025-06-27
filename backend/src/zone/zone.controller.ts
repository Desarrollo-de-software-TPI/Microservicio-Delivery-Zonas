import { Controller, Get, Post, Delete, Body, HttpException, HttpStatus, Param, Put, Patch, Query } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { Zone } from './zone.entity';
import { CreateZoneDto } from './dto/CreateZone.dto';
import { PaginationDto } from '../pagination/pagination.dto';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<{zones: Zone[]; total: number}> {
        return this.zoneService.findAll(paginationDto);
    }

  @Post()
  create(@Body() createZoneDto: CreateZoneDto){
    return this.zoneService.create(createZoneDto);
  }

  @Get(':id')
  //async findOne(@Param('id', ParseIntPipe) id: number) el parseIntPipe convierte el id a number
  async findOne(@Param('id') id: string) {
    try {
      const zone = await this.zoneService.findOne(+id);
      if (!zone) {
        throw new HttpException('Zone not found', HttpStatus.NOT_FOUND);
      }
      return zone;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateZoneDto: CreateZoneDto) {
    try {
      const zone = await this.zoneService.update(+id, updateZoneDto);
      if (!zone) {
        throw new HttpException('Zone not found', HttpStatus.NOT_FOUND);
      }
      return zone;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async updatePartial(@Param('id') id: string, @Body() updateZoneDto: CreateZoneDto) {
    try {
      const zone = await this.zoneService.updatePartial(+id, updateZoneDto);
      if (!zone) {
        throw new HttpException('Zone not found', HttpStatus.NOT_FOUND);
      }
      return zone;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.zoneService.remove(+id);
      return { message: 'Zone deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }






}