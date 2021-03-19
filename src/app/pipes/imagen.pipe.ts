import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo:'usuarios'|'medicos'|'hospitales'): string {
    img = img || 'no-image';
    let urlImage = '';

    if ( img.includes('https') ) {
        urlImage = img;
    } else {
        urlImage = `${ environment.api_base_url }/upload/${tipo}/${ img }`;
    }
    return urlImage;
  }
}
