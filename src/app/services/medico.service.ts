import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient,
    private router: Router) { }
    
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

  loadMedicos(from: number = 0, limit: number = 5) {
    return this.http.get(`${ environment.api_base_url }/medicos`, this.headers)
    .pipe(
      // delay(2*1000),
      map((resp: {success: boolean, medicos:Medico[]}) => {
        return resp.medicos;
      }
      )
    )
  }

  loadMedico(id: string) {
    return this.http.get(`${ environment.api_base_url }/medicos/${id}`, this.headers)
    .pipe(
      // catchError(err => {
      //   console.log('error caught in medicoService\\loadMedico');
      //   console.error(err);
      //   return ([]);
      // }),
      map((resp: {success: boolean, medico:Medico}) => {
        return resp.medico;
      }
      )
    )
  }

  crearMedico(medico: Medico) {
    return this.http.post(`${ environment.api_base_url }/medicos`, medico, this.headers);
  }

  updateMedico(medico: Medico) {
    return this.http.put(`${ environment.api_base_url }/medicos/${medico.id}`, medico, this.headers);
  }

  deleteMedico(medico: Medico) {
    return this.http.delete(`${ environment.api_base_url }/medicos/${medico.id}`, this.headers)
  }
}
