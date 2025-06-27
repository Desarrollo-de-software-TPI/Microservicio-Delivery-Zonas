export enum DeliveryPersonStatus {
  AVAILABLE = 'available',
  IN_ROUTE = 'in_route',
  DELIVERING = 'delivering',
  WAITING_FOR_ORDER = 'waiting_for_order',
  UNAVAILABLE = 'unavailable',
  WITH_ISSUE = 'with_issue',
  OFFLINE = 'offline'
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Zone {
  id: number;
  name: string;
  // Agregar otras propiedades de zona según sea necesario
}

export interface DeliveryPerson {
  id: number;
  personId: number;
  location: Location;
  radius: number;
  status: DeliveryPersonStatus;
  zones?: Zone[];
}

export interface CreateDeliveryPersonDto {
  personId: number;
  location: Location;
  radius: number;
}

export interface UpdateLocationDeliveryPersonDto {
  location: Location;
}

export interface UpdateStatusDeliveryPersonDto {
  status: DeliveryPersonStatus;
}

export interface FindByProximityDeliveryPersonDto {
  location: Location;
  maxDistance: number;
}

export interface FindByZoneDto {
  zoneId: number;
}

export interface AssignZoneDeliveryPersonDto {
  zoneId: number;
}

export interface PaginationDto {
  page?: number;
  limit?: number;
}
