import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     elements: [
  //       // { title: 'Main', url: '/dashboard' },
  //       // { title: 'Gráfica 1', url: '/dashboard/grafica1' },
  //       // { title: 'Progress', url: '/dashboard/progress' },
  //       // { title: 'Promesas', url: '/dashboard/promesas' },
  //       // { title: 'rxJS', url: '/dashboard/rxjs' },
  //       { title: 'Main', url: 'dashboard' },
  //       { title: 'Gráfica 1', url: 'grafica1' },
  //       { title: 'Progress', url: 'progress' },
  //       { title: 'Promesas', url: 'promesas' },
  //       { title: 'rxJS', url: 'rxjs' },
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     elements: [
  //       { title: 'Usuarios', url: 'usuarios' },
  //       { title: 'Hospitales', url: 'hospitales' },
  //       { title: 'Médicos', url: 'medicos' },
  //     ]
  //   }
  // ]

  public menu = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
    if (this.menu.length === 0) {
      // Redireccionar al login
    }
  }

  constructor() { }
}
