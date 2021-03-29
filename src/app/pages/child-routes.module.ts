import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

import { AdminGuard } from '../guards/admin.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const childRoutes: Routes = [
  //   { path: 'dashboard', component: DashboardComponent},
  { path: '', component: DashboardComponent, data: {title: 'Dashboard'}}, // Path '' para que no sea "/dashboard/dashboard"
  { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Account settings'}},
  { path: 'search/:searchValue', component: BusquedaComponent, data: {title: 'Global Search'}},
  { path: 'grafica1', component: Grafica1Component, data: {title: 'Doughnut Graph'}},
  { path: 'profile', component: ProfileComponent, data: {title: 'Profile'}},
  { path: 'progress', component: ProgressComponent, data: {title: 'Progress Bars'}},
  { path: 'promesas', component: PromesasComponent, data: {title: 'Promises'}},
  { path: 'rxjs', component: RxjsComponent, data: {title: 'rxjs'}},
  //   { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  
  // Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: {title: 'Mantenimiento de Hospitales'}},
  { path: 'medicos', component: MedicosComponent, data: {title: 'Mantenimiento de Médicos'}},
  { path: 'medico/:id', component: MedicoComponent, data: {title: 'Mantenimiento de Médicos'}},
  // Rutas de Admin
  { path: 'usuarios', 
    canActivate: [AdminGuard], // Añadimos el Guard
    component: UsuariosComponent, 
    data: {title: 'Mantenimiento de Usuarios'}
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
    // CommonModule
  ],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
