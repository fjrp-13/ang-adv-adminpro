import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario.model';

const api_base_url = environment.api_base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private _hideModal: boolean = true;

  private dataElement: any;

  constructor() { }

  get isHidden() {
    return this._hideModal;
  }

  get img() {
    return this.dataElement.img || '';
  }

  openModal(dataElement: any) {
    this._hideModal = false;
    this.dataElement = dataElement;
    this.dataElement.type = 'no-type';
    this.dataElement.img = this.dataElement.img || 'no-image'
    this.dataElement.urlImage = ''

    if (dataElement instanceof Usuario) {
      this.dataElement.type = 'usuarios';
    }

    if ( this.dataElement.img.includes('https') ) {
      this.dataElement.urlImage = this.dataElement.img;
    } else {
      this.dataElement.urlImage = `${ api_base_url }/upload/${ this.dataElement.type }/${ this.dataElement.img }`;
    }
    console.log(this.dataElement);
  }

  closeModal() {
    this._hideModal = true;
  }
}
