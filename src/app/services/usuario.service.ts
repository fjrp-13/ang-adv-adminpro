import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, resolveForwardRef } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators'; // tap: dispara un "efecto secundario" (como añadir un paso extra)
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const api_base_url = environment.api_base_url;

// Le indicamos a Angular que "confíe" que esta constante existe (es para Google Sign-in la define el script "https://apis.google.com/js/platform.j" que se carga en "index.html")
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  public auth2: any; // Para Google Sign-in
  public usuarioLogeado: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone ) { // NgZone para poder ejecutar procesos de Angular aunque se ejecuten fuera de Angular (desde terceros)
    // Inicializamos el GoogleAuth para el Sign-in
    this.initGoogleAuth();
  }

  get token(): string {
    return localStorage.getItem('token') || '';;
  }
  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${ api_base_url }/usuarios`, formData)
    .pipe(tap(resp => {
      localStorage.setItem('token', resp['token']);
    }));
  }

  actualizarPerfil(data:{ email: string, nombre: string }) {
    return this.http.put(`${ api_base_url }/usuarios/${ this.usuarioLogeado.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  // https://developers.google.com/identity/sign-in/web/build-button
  //startApp = function() {
  initGoogleAuth = function() {
    return new Promise<void>( (resolve, reject) => {
      // Cambiamos el 2º parámetro x una función de flecha, pq la función normal cambia el "this"
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: "544842466301-lc5sct1d55dnel59fl5a85b2r2btjag4.apps.googleusercontent.com",
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        // this.attachSignin(document.getElementById(idGoogleBtn));
        resolve(); // Para que no de error/warning por no usar argumentos, la Promesa debe ser "Promise<void>" para indicar que no tendrá argumentos
      });
    })
  };

  login(formData: LoginForm) {
    return this.http.post(`${ api_base_url }/login`, formData)
    .pipe(tap(resp => {
      localStorage.setItem('token', resp['token']);
    }));
  }

  loginGoogle(token) {
    return this.http.post(`${ api_base_url }/login/google`, {token})
    .pipe(tap(resp => {
      localStorage.setItem('token', resp['token']);
    }));
  }
  
  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => { // Cambiado a función de flecha para que "this" no se cambie y haga referencia a la propia clase
      this.ngZone.run(() => {
        // Usamos ngZone para que se ejecuten procesos de Angular desde el Google Auth
        this.router.navigateByUrl('/login');
      });
    });
  }

  validateToken():Observable<boolean> {
    return this.http.get(`${ api_base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    })
    .pipe(
      map((resp) => {
        const { nombre, email, img, google, role, uid } = resp['usuario'];
        // Instanciamos el usuario Logeado con el usuario devuelto 
        this.usuarioLogeado = new Usuario(nombre, email, '', img, google, role, uid);
        localStorage.setItem('token', resp['token']);
        // return (resp?true:false);
        return true; // Si llega aquí, es que tenemos una respuesta, por lo que podemos devolver directamente 'true'
      }),
      catchError( error => {
        console.log(error);
        return of (false) // El "of" es para que devuelva un Observable
      })
    );
  }
}

