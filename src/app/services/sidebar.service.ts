import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      elements: [
        { title: 'Main', url: '/dashboard' },
        { title: 'Progress', url: '/dashboard/progress' },
        { title: 'Gráfica 1', url: '/dashboard/grafica1' },
      ]
    }
  ]

  constructor() { }
}
