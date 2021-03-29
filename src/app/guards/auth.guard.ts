import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Ha de implementar el CanLoad para los LazyLoad
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {

  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
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
