import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

  private transformarHospitales(data: any[]): Hospital[] {
    return data;
  }

  private transformarMedicos(data: any[]): Medico[] {
    return data;
  }
  
  searchByType(type: 'usuarios'|'medicos'|'hospitales', query: string) {
    return this.http.get(`${ api_base_url }/search/type/${ type }/${ query }`, this.headers)
    .pipe(
      map((resp: any) => {
        switch (type) {
          case 'usuarios':
              resp.data = this.transformarUsuarios(resp.data)
            break;
          case 'hospitales':
              resp.data = this.transformarHospitales(resp.data)
            break;
          case 'medicos':
              resp.data = this.transformarMedicos(resp.data)
              break;
          // default:
            // resp.data = [];
        }
        return {
          total: resp.data.length,
          data: resp.data
        };
      })
    )
  }


  searchGlobal(query: string) {
    return this.http.get(`${ api_base_url }/search/${ query }`, this.headers)
    .pipe(
      map((resp: any) => {
        return {
          data: resp
        };
      })
    )
  }

}
