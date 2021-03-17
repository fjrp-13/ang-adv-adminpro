import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const api_base_url = environment.api_base_url;


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  // Observable: lo usaremos para emitir un string cuando el upload haya ido correctamente
  // public imageUploaded: EventEmitter<string> = new EventEmitter<string>();

  // Hacer el upload con el Fetch API

  // Para poder trabajar en base a Promesas, le indicamos "async" para poder utilizar el "await" internamente
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string){
    try {
      const url = `${api_base_url}/upload/${tipo}/${id}`;
      const formData = new FormData(); // Para crear la Data a enviar al Fetch
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData
      });

      // Obtener la Data del Fetch API
      const data = await resp.json();
      return data;

    } catch (error) {
      console.log(error);
      return {success: false};
    }
  }
}
