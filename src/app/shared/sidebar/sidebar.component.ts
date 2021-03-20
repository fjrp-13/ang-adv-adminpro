import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // public menuItems: any[]; // Hacemos el "sidebarService" público y lo utilizaremos directamente (para que coja correctamente el menú desde el LocalStorage)
  public usuario: Usuario;

  constructor(public sidebarService: SidebarService,
              private usuarioService: UsuarioService,) {
    // this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuarioLogeado;
  }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.logout();
  }
}
