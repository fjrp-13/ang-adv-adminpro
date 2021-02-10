import { NgModule } from '@angular/core';
//fjrp import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  // path: '/dashboard'  => PagesRouting
  // path: '/progress'   => PagesRouting
  // path: '/grafica1'   => PagesRouting
  // path: '/login'      => AuthRouting
  // path: '/register'   => AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: PagenotfoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot( routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
