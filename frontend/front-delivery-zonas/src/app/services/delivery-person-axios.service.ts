import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import {
  DeliveryPerson,
  CreateDeliveryPersonDto,
  UpdateLocationDeliveryPersonDto,
  UpdateStatusDeliveryPersonDto,
  FindByProximityDeliveryPersonDto,
  FindByZoneDto,
  AssignZoneDeliveryPersonDto,
  PaginationDto,
  Zone
} from '../models/delivery-person.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPersonAxiosService {
  private readonly axiosInstance: AxiosInstance;
  private readonly baseUrl = 'http://localhost:3000/delivery';

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Interceptor para manejo de errores
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Obtener todos los delivery persons con paginación
  async findAll(pagination?: PaginationDto): Promise<DeliveryPerson[]> {
    const params = new URLSearchParams();
    if (pagination?.page) {
      params.append('page', pagination.page.toString());
    }
    if (pagination?.limit) {
      params.append('limit', pagination.limit.toString());
    }
    
    const response = await this.axiosInstance.get<DeliveryPerson[]>('/', { params });
    return response.data;
  }

  // Crear un nuevo delivery person
  async create(createDto: CreateDeliveryPersonDto): Promise<DeliveryPerson> {
    const response = await this.axiosInstance.post<DeliveryPerson>('/', createDto);
    return response.data;
  }

  // Actualizar ubicación de un delivery person
  async updateLocation(id: number, updateLocationDto: UpdateLocationDeliveryPersonDto): Promise<DeliveryPerson> {
    const response = await this.axiosInstance.put<DeliveryPerson>(`/${id}/location`, updateLocationDto);
    return response.data;
  }

  // Actualizar estado de un delivery person
  async updateStatus(id: number, updateStatusDto: UpdateStatusDeliveryPersonDto): Promise<DeliveryPerson> {
    const response = await this.axiosInstance.put<DeliveryPerson>(`/${id}/status`, updateStatusDto);
    return response.data;
  }

  // Buscar delivery persons por proximidad
  async findByProximity(findByProximityDto: FindByProximityDeliveryPersonDto): Promise<DeliveryPerson[]> {
    const params = new URLSearchParams();
    Object.entries(findByProximityDto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          params.append(key, JSON.stringify(value));
        } else {
          params.append(key, value.toString());
        }
      }
    });
    
    const response = await this.axiosInstance.get<DeliveryPerson[]>('/findByProximity', { params });
    return response.data;
  }

  // Buscar delivery persons por zona
  async findByZone(findByZoneDto: FindByZoneDto): Promise<DeliveryPerson[]> {
    const params = new URLSearchParams();
    Object.entries(findByZoneDto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    
    const response = await this.axiosInstance.get<DeliveryPerson[]>('/findByZone', { params });
    return response.data;
  }

  // Asignar zona a un delivery person
  async assignZone(id: number, assignZoneDto: AssignZoneDeliveryPersonDto): Promise<DeliveryPerson> {
    const response = await this.axiosInstance.post<DeliveryPerson>(`/${id}/assignZone`, assignZoneDto);
    return response.data;
  }

  // Obtener zonas asignadas a un delivery person
  async getZonesAssigned(id: number): Promise<Zone[]> {
    const response = await this.axiosInstance.get<Zone[]>(`/${id}/zones`);
    return response.data;
  }

  // Remover zona de un delivery person
  async removeZone(id: number, zoneId: number): Promise<{ message: string }> {
    const response = await this.axiosInstance.delete<{ message: string }>(`/${id}/zone/${zoneId}`);
    return response.data;
  }

  // Eliminar un delivery person
  async remove(id: number): Promise<{ message: string }> {
    const response = await this.axiosInstance.delete<{ message: string }>(`/${id}`);
    return response.data;
  }
}
