import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
export class DeliveryPersonService {
  private readonly baseUrl = 'http://localhost:3000/delivery'; // Ajustar según tu configuración

  constructor(private http: HttpClient) { }

  // Obtener todos los delivery persons con paginación
  findAll(pagination?: PaginationDto): Observable<DeliveryPerson[]> {
    let params = new HttpParams();
    if (pagination?.page) {
      params = params.set('page', pagination.page.toString());
    }
    if (pagination?.limit) {
      params = params.set('limit', pagination.limit.toString());
    }
    return this.http.get<DeliveryPerson[]>(this.baseUrl, { params });
  }

  // Crear un nuevo delivery person
  create(createDto: CreateDeliveryPersonDto): Observable<DeliveryPerson> {
    return this.http.post<DeliveryPerson>(this.baseUrl, createDto);
  }

  // Actualizar ubicación de un delivery person
  updateLocation(id: number, updateLocationDto: UpdateLocationDeliveryPersonDto): Observable<DeliveryPerson> {
    return this.http.put<DeliveryPerson>(`${this.baseUrl}/${id}/location`, updateLocationDto);
  }

  // Actualizar estado de un delivery person
  updateStatus(id: number, updateStatusDto: UpdateStatusDeliveryPersonDto): Observable<DeliveryPerson> {
    return this.http.put<DeliveryPerson>(`${this.baseUrl}/${id}/status`, updateStatusDto);
  }

  // Buscar delivery persons por proximidad
  findByProximity(findByProximityDto: FindByProximityDeliveryPersonDto): Observable<DeliveryPerson[]> {
    let params = new HttpParams();
    Object.entries(findByProximityDto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<DeliveryPerson[]>(`${this.baseUrl}/findByProximity`, { params });
  }

  // Buscar delivery persons por zona
  findByZone(findByZoneDto: FindByZoneDto): Observable<DeliveryPerson[]> {
    let params = new HttpParams();
    Object.entries(findByZoneDto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<DeliveryPerson[]>(`${this.baseUrl}/findByZone`, { params });
  }

  // Asignar zona a un delivery person
  assignZone(id: number, assignZoneDto: AssignZoneDeliveryPersonDto): Observable<DeliveryPerson> {
    return this.http.post<DeliveryPerson>(`${this.baseUrl}/${id}/assignZone`, assignZoneDto);
  }

  // Obtener zonas asignadas a un delivery person
  getZonesAssigned(id: number): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${this.baseUrl}/${id}/zones`);
  }

  // Remover zona de un delivery person
  removeZone(id: number, zoneId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}/zone/${zoneId}`);
  }

  // Eliminar un delivery person
  remove(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
