import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';


const routes: Routes = [
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
    {
        path: 'dashboard', // Para que estas rutas se muestren "colgando" de "/dashboard"
        component: PagesComponent,
        children: [
        //   { path: 'dashboard', component: DashboardComponent},
          { path: '', component: DashboardComponent}, // Path '' para que no sea "/dashboard/dashboard"
          { path: 'progress', component: ProgressComponent},
          { path: 'grafica1', component: Grafica1Component},
        //   { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
