import { Routes } from '@angular/router';
import { DeliveryPersonAxiosComponent } from './components/delivery-person-axios/delivery-person-axios.component';
import { Zone } from './components/zone/zone';

export const routes: Routes = [
  { path: '', redirectTo: '/delivery-persons', pathMatch: 'full' },
  { path: 'delivery-persons', component: DeliveryPersonAxiosComponent },
  { path: 'zones', component: Zone },
];
