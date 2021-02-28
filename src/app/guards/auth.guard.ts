import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      // console.log('Pasó por en canActivate del Guard');
      // this.usuarioService.validateToken().subscribe(resp => {
      //   console.log(resp);
      // })
      // return true;
      
      // El "map" convierte el resultado en true/false
      return this.usuarioService.validateToken()
        .pipe(
          tap( (isAuth) => {
            if (!isAuth) {
              this.router.navigateByUrl('login');
            }
          })
        );
    }
  
}
