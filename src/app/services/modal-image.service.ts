import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario.model';

const api_base_url = environment.api_base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private _hideModal: boolean = true;
  public type: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;

  // Observable: lo usaremos para emitir un string cuando la imagen se actualice (desde el "modal-image.component.ts")
  public imageUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get isHidden() {
    return this._hideModal;
  }

  openModal(
    type: 'usuarios'|'medicos'|'hospitales',
    id: string,
    img: string = 'no-image'
  ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    if ( img.includes('https') ) {
      this.img = img;
    } else {
      this.img = `${ api_base_url }/upload/${ this.type }/${ img }`;
    }
  }

  closeModal() {
    this._hideModal = true;
  }
}
