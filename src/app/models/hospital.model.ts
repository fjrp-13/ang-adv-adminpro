// import { environment } from '../../environments/environment';
// const api_base_url = environment.api_base_url;

interface _HospitalUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {
    constructor(
        public nombre    : string,
        public id?       : string,
        public img?      : string,
        public usuario?   : _HospitalUser
    ){}

    // LO CAMBIAMOS POR UN PIPE
    // get urlUserImage() {
    //     let img = this.img || 'no-image';
    //     let urlImage = '';

    //     if ( img.includes('https') ) {
    //         urlImage = img;
    //     } else {
    //         urlImage = `${ api_base_url }/upload/hospitales/${ img }`;
    //     }

    //     return urlImage;
    // }
}