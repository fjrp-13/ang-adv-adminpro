import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RxjsComponent } from './rxjs/rxjs.component';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
// import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PromesasComponent } from './promesas/promesas.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    ProfileComponent,
    PromesasComponent,
    RxjsComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, // Para poder utilizar las rutas (<router-oultet></router-oultet>)
    FormsModule,  // Para poder trabajar con el ngModel (Inputs)
    ReactiveFormsModule, // Para poder trabajar con Formularios Reactivos
    SharedModule,
    ComponentsModule,
    PipesModule, // Módulo creado para los Pipes
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    ProfileComponent,
  ]
})
export class PagesModule { }
