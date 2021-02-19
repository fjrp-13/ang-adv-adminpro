import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {
  constructor() { 
    // El Subscriber "observer" (parámetro), es quien va a estar emitiendo los valores (cuándo termina, cuándo da error, ...).
    // Este Subscriber es quien va a decir cómo está el Observable y qué información está fluyendo a través de él.
    const obs$ = new Observable( observer => {
      let i = 0;
      const intervalo = setInterval( () => {
        i++;
        observer.next(i); // Siguiente valor que queremos emitir
        if (i > 3) {
          clearInterval(intervalo);
          observer.complete(); // Cancelamos la emisión de valores del Observer
        }
        if (i === 2) {
          observer.error('error forzado!');
        }
      } , 1000);
    });

    // Nos subscribimos al Observable
    obs$.subscribe(
      valor => {
        console.log('Subs: ', valor);
      },
      err => console.warn('Error:', err),
      () => console.info('Obs terminado')
    );

  }

  ngOnInit(): void {
  }

}
