import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario.model';

const api_base_url = environment.api_base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  
  get token(): string {
    return localStorage.getItem('token') || '';;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformarUsuarios(data: any[]): Usuario[] {
    return data.map( user => {
      return new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid);
    });
  }
  
  searchByType(type: 'usuarios'|'medicos'|'hospitales', query: string) {
    return this.http.get(`${ api_base_url }/search/type/${ type }/${ query }`, this.headers)
    .pipe(
      map((resp: any) => {
        switch (type) {
          case 'usuarios':
              resp.data = this.transformarUsuarios(resp.data)
            break;
        
          default:
            return []
            break;
        }
        return {
          total: resp.data.length,
          data: resp.data
        };
      })
    )
  }
}
