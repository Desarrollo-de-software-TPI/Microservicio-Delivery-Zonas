import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryPersonAxiosService } from '../../services/delivery-person-axios.service';
import {
  DeliveryPerson,
  DeliveryPersonStatus,
  CreateDeliveryPersonDto,
  UpdateLocationDeliveryPersonDto,
  UpdateStatusDeliveryPersonDto,
  Zone,
  AssignZoneDeliveryPersonDto
} from '../../models/delivery-person.interface';

@Component({
  selector: 'app-delivery-person-axios',
  imports: [CommonModule, FormsModule],
  templateUrl: '../delivery-person/delivery-person.html',
  styleUrl: '../delivery-person/delivery-person.css'
})
export class DeliveryPersonAxiosComponent implements OnInit {
  deliveryPersons: DeliveryPerson[] = [];
  selectedDeliveryPerson: DeliveryPerson | null = null;
  zones: Zone[] = [];
  
  // Form data
  newDeliveryPerson: CreateDeliveryPersonDto = {
    personId: 0,
    location: { lat: 0, lng: 0 },
    radius: 1
  };
  
  updateLocationData: UpdateLocationDeliveryPersonDto = {
    location: { lat: 0, lng: 0 }
  };
  
  updateStatusData: UpdateStatusDeliveryPersonDto = {
    status: DeliveryPersonStatus.AVAILABLE
  };
  
  assignZoneData: AssignZoneDeliveryPersonDto = {
    zoneId: 0
  };
  
  // UI state
  showCreateForm = false;
  showUpdateLocationForm = false;
  showUpdateStatusForm = false;
  showAssignZoneForm = false;
  
  // Enums para el template
  deliveryPersonStatuses = Object.values(DeliveryPersonStatus);
  
  constructor(private deliveryPersonService: DeliveryPersonAxiosService) {}
  
  ngOnInit(): void {
    this.loadDeliveryPersons();
  }
  
  async loadDeliveryPersons(): Promise<void> {
    try {
      this.deliveryPersons = await this.deliveryPersonService.findAll();
    } catch (error) {
      console.error('Error loading delivery persons:', error);
    }
  }
  
  async createDeliveryPerson(): Promise<void> {
    try {
      const newDeliveryPerson = await this.deliveryPersonService.create(this.newDeliveryPerson);
      this.deliveryPersons.push(newDeliveryPerson);
      this.resetCreateForm();
      this.showCreateForm = false;
    } catch (error) {
      console.error('Error creating delivery person:', error);
    }
  }
  
  async updateLocation(id: number): Promise<void> {
    try {
      const updatedDeliveryPerson = await this.deliveryPersonService.updateLocation(id, this.updateLocationData);
      const index = this.deliveryPersons.findIndex(dp => dp.id === id);
      if (index !== -1) {
        this.deliveryPersons[index] = updatedDeliveryPerson;
      }
      this.showUpdateLocationForm = false;
      this.selectedDeliveryPerson = null;
    } catch (error) {
      console.error('Error updating location:', error);
    }
  }
  
  async updateStatus(id: number): Promise<void> {
    try {
      const updatedDeliveryPerson = await this.deliveryPersonService.updateStatus(id, this.updateStatusData);
      const index = this.deliveryPersons.findIndex(dp => dp.id === id);
      if (index !== -1) {
        this.deliveryPersons[index] = updatedDeliveryPerson;
      }
      this.showUpdateStatusForm = false;
      this.selectedDeliveryPerson = null;
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }
  
  async assignZone(id: number): Promise<void> {
    try {
      const updatedDeliveryPerson = await this.deliveryPersonService.assignZone(id, this.assignZoneData);
      const index = this.deliveryPersons.findIndex(dp => dp.id === id);
      if (index !== -1) {
        this.deliveryPersons[index] = updatedDeliveryPerson;
      }
      this.showAssignZoneForm = false;
      this.selectedDeliveryPerson = null;
    } catch (error) {
      console.error('Error assigning zone:', error);
    }
  }
  
  async removeZone(deliveryPersonId: number, zoneId: number): Promise<void> {
    try {
      await this.deliveryPersonService.removeZone(deliveryPersonId, zoneId);
      await this.loadDeliveryPersons(); // Recargar para actualizar las zonas
    } catch (error) {
      console.error('Error removing zone:', error);
    }
  }
  
  async deleteDeliveryPerson(id: number): Promise<void> {
    if (confirm('¿Está seguro de que desea eliminar este delivery person?')) {
      try {
        await this.deliveryPersonService.remove(id);
        this.deliveryPersons = this.deliveryPersons.filter(dp => dp.id !== id);
      } catch (error) {
        console.error('Error deleting delivery person:', error);
      }
    }
  }
  
  async selectDeliveryPerson(deliveryPerson: DeliveryPerson): Promise<void> {
    this.selectedDeliveryPerson = deliveryPerson;
    try {
      this.zones = await this.deliveryPersonService.getZonesAssigned(deliveryPerson.id);
    } catch (error) {
      console.error('Error loading zones:', error);
    }
  }
  
  resetCreateForm(): void {
    this.newDeliveryPerson = {
      personId: 0,
      location: { lat: 0, lng: 0 },
      radius: 1
    };
  }
  
  getStatusLabel(status: DeliveryPersonStatus): string {
    const statusLabels: { [key in DeliveryPersonStatus]: string } = {
      [DeliveryPersonStatus.AVAILABLE]: 'Disponible',
      [DeliveryPersonStatus.IN_ROUTE]: 'En ruta',
      [DeliveryPersonStatus.DELIVERING]: 'Entregando',
      [DeliveryPersonStatus.WAITING_FOR_ORDER]: 'Esperando pedido',
      [DeliveryPersonStatus.UNAVAILABLE]: 'No disponible',
      [DeliveryPersonStatus.WITH_ISSUE]: 'Con problemas',
      [DeliveryPersonStatus.OFFLINE]: 'Fuera de línea'
    };
    return statusLabels[status];
  }
}
