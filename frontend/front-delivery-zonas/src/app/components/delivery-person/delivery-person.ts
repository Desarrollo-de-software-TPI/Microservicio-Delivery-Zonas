import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryPersonService } from '../../services/delivery-person';
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
  selector: 'app-delivery-person',
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery-person.html',
  styleUrl: './delivery-person.css'
})
export class DeliveryPersonComponent implements OnInit {
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
  
  constructor(private deliveryPersonService: DeliveryPersonService) {}
  
  ngOnInit(): void {
    this.loadDeliveryPersons();
  }
  
  loadDeliveryPersons(): void {
    this.deliveryPersonService.findAll().subscribe({
      next: (data) => {
        this.deliveryPersons = data;
      },
      error: (error) => {
        console.error('Error loading delivery persons:', error);
      }
    });
  }
  
  createDeliveryPerson(): void {
    this.deliveryPersonService.create(this.newDeliveryPerson).subscribe({
      next: (data) => {
        this.deliveryPersons.push(data);
        this.resetCreateForm();
        this.showCreateForm = false;
      },
      error: (error) => {
        console.error('Error creating delivery person:', error);
      }
    });
  }
  
  updateLocation(id: number): void {
    this.deliveryPersonService.updateLocation(id, this.updateLocationData).subscribe({
      next: (data) => {
        const index = this.deliveryPersons.findIndex(dp => dp.id === id);
        if (index !== -1) {
          this.deliveryPersons[index] = data;
        }
        this.showUpdateLocationForm = false;
        this.selectedDeliveryPerson = null;
      },
      error: (error) => {
        console.error('Error updating location:', error);
      }
    });
  }
  
  updateStatus(id: number): void {
    this.deliveryPersonService.updateStatus(id, this.updateStatusData).subscribe({
      next: (data) => {
        const index = this.deliveryPersons.findIndex(dp => dp.id === id);
        if (index !== -1) {
          this.deliveryPersons[index] = data;
        }
        this.showUpdateStatusForm = false;
        this.selectedDeliveryPerson = null;
      },
      error: (error) => {
        console.error('Error updating status:', error);
      }
    });
  }
  
  assignZone(id: number): void {
    this.deliveryPersonService.assignZone(id, this.assignZoneData).subscribe({
      next: (data) => {
        const index = this.deliveryPersons.findIndex(dp => dp.id === id);
        if (index !== -1) {
          this.deliveryPersons[index] = data;
        }
        this.showAssignZoneForm = false;
        this.selectedDeliveryPerson = null;
      },
      error: (error) => {
        console.error('Error assigning zone:', error);
      }
    });
  }
  
  removeZone(deliveryPersonId: number, zoneId: number): void {
    this.deliveryPersonService.removeZone(deliveryPersonId, zoneId).subscribe({
      next: () => {
        this.loadDeliveryPersons(); // Recargar para actualizar las zonas
      },
      error: (error) => {
        console.error('Error removing zone:', error);
      }
    });
  }
  
  deleteDeliveryPerson(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este delivery person?')) {
      this.deliveryPersonService.remove(id).subscribe({
        next: () => {
          this.deliveryPersons = this.deliveryPersons.filter(dp => dp.id !== id);
        },
        error: (error) => {
          console.error('Error deleting delivery person:', error);
        }
      });
    }
  }
  
  selectDeliveryPerson(deliveryPerson: DeliveryPerson): void {
    this.selectedDeliveryPerson = deliveryPerson;
    // Cargar las zonas asignadas
    this.deliveryPersonService.getZonesAssigned(deliveryPerson.id).subscribe({
      next: (zones) => {
        this.zones = zones;
      },
      error: (error) => {
        console.error('Error loading zones:', error);
      }
    });
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
