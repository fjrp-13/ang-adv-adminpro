import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  loadHospitales() {
    return this.http.get(`${ environment.api_base_url }/hospitales`, this.headers)
    .pipe(
      // delay(2*1000),
      map((resp: {success: boolean, hospitales:Hospital[]}) => {
        return resp.hospitales;
      }
      )
    )
  }

  crearHospital(nombre: string) {
    return this.http.post(`${ environment.api_base_url }/hospitales`, {nombre: nombre}, this.headers);
  }

  updateHospital(hospital: Hospital) {
    return this.http.put(`${ environment.api_base_url }/hospitales/${hospital.id}`, hospital, this.headers);
  }

  deleteHospital(id: string) {
    return this.http.delete(`${ environment.api_base_url }/hospitales/${id}`, this.headers)
  }
}


