import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';

const routes: Routes = [
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
    {
        path: 'dashboard', // Para que estas rutas se muestren "colgando" de "/dashboard"
        component: PagesComponent,
        canActivate: [AuthGuard], // Añadimos el Guard
        // children: [
        // ]
        canLoad: [AuthGuard], // Guard que se ha de implementar si se trabaja con LazyLoad para verificar que la ruta se pueda cargar
        loadChildren: () => { // Función de flecha que carga el módulo de manera "perezosa"
          return import('./child-routes.module').then(modulo => modulo.ChildRoutesModule);
          // Parámetro del import: el path del módulo que queremos cargar
          // Import es una promesa, y cuando termine de cargar el módulo disparará el "then", que regresará el modulo, el cual lo retornaremos
        } 
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
