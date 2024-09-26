import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MotoristaListComponent } from './pages/motorista-list/motorista-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'motoristas', component: MotoristaListComponent },
];
