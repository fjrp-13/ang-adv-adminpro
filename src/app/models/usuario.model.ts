import { environment } from '../../environments/environment';

const api_base_url = environment.api_base_url;

export class Usuario {
    constructor(
        public nombre    : string,
        public email     : string,
        public password? : string,
        public img?      : string,
        public google?   : boolean,
        public role?     : string,
        public uid?      : string,
    ){}

    get urlUserImage() {
        let img = this.img || 'no-image';
        let urlImage = '';

        if ( img.includes('https') ) {
            urlImage = img;
        } else {
            urlImage = `${ api_base_url }/upload/usuarios/${ img }`;
        }

        return urlImage;
    }
}