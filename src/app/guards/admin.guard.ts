import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if (this.usuarioService.role === 'ADMIN_ROLE') {
        return true;
      } else {
        // Si redireccionamos al Logout, limpiar el token y el menú del localStorage
        this.router.navigateByUrl('dashboard');
        return false;
      }
  }
  
}
