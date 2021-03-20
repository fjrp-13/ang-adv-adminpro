import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  usuarios: any;

  constructor() { }

  ngOnInit(): void {
    // /* Ejemplo de Promesa */
    // const promesa = new Promise( (resolve, reject) => {
    //   if (false) {
    //     resolve('Hola Mundo!');
    //   } else {
    //     reject('Algo salió mal');
    //   }
    // });

    // promesa
    //   .then( result => {
    //     console.log(result);
    //   })
    //   .catch( err => {
    //     console.log(`Error en la promesa: ${err}.`);
    //   })
    // console.log('Fin del init');
    
    // // Llamada para V1 y V2
    // this.getUsuarios();

    // // Llamada para V3
    this.getUsuarios().then(usuarios => {
      // console.log(usuarios);
      this.usuarios = usuarios;
    });
  }

  // /* V1: promesas "en cascada" */
  // getUsuarios() {
  //   fetch('https://reqres.in/api/users')
  //     .then(resp => {
  //       resp.json().then( body => console.log(body);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  /* V2: promesas "concatenadas"  */
  // getUsuarios() {
  //   fetch('https://reqres.in/api/users')
  //     .then(resp => resp.json())
  //     .then(body => console.log(body))
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

    // /* V3.0: retorno de promesa  */
    // getUsuarios() {
    //   // Creo una promesa manualmente ...
    //   const promesa = new Promise( resolve => {
    //     fetch('https://reqres.in/api/users')
    //       .then(resp => resp.json())
    //       .then(body => resolve(body.data)) // ... e indico cuándo quiero resolverla ...
    //   });

    //   return promesa; // .. y retorno mi promesa (para que poder estar pendiente de cuándo se resuelva)
    // }

    /* V3.1: retorno de promesa  */
    getUsuarios() {
      // Devuelvo directamente mi promesa "manual" ...
      return new Promise( resolve => {
        fetch('https://reqres.in/api/users')
          .then(resp => resp.json())
          .then(body => resolve(body.data)) // ... e indico cuándo quiero resolverla ...
      });
    }

    

}
