import { Routes } from '@angular/router';
import { MotoristaListComponent } from './pages/motorista-list/motorista-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'motoristas', component: MotoristaListComponent },
];
