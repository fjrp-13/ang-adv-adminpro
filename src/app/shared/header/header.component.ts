import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  
  constructor(private usuarioService: UsuarioService,
              private router: Router
  ) { 
    this.usuario = usuarioService.usuarioLogeado;
  }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.logout();
  }

  doSearch(searchValue: string) {
    if (searchValue.trim().length === 0) {
      this.router.navigateByUrl(`dashboard`);
    } else {
      this.router.navigateByUrl(`dashboard/search/${searchValue}`);
    }
  }
}
