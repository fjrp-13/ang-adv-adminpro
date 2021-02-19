import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs'; // Funciones/Macros de rxjs
import { retry, take, map, filter } from 'rxjs/operators'; // +/- funciones que se conectan a Observables o se encadenan entre sí


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  // Guardamos la subscripción en una propiedad de la clase, para poder "tratarla"
  public intervalSubscription: Subscription;

  constructor() { 
    // // Nos subscribimos al Observable
    // this.retornaObservable().pipe(
    //   // Para usar "retry" hay que importar "import { retry } from 'rxjs/operators'"
    //   // retry() // Vuelve a ejecutar el Observable (infinitamente)
    //   retry(1) // Vuelve a ejecutar el Observable (1 vez)
    // ).subscribe(
    //   valor => {
    //     console.log('Subs: ', valor);
    //   },
    //   err => console.warn('Error:', err),
    //   () => console.info('Obs terminado')
    // );

    // Guardamos la subscripción en la propiedad de la clase
    this.intervalSubscription = this.retornaIntervalo()
                                    .subscribe(console.log);
  }
  
  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe(); // Termina el Observable y deja de estar subscrito a él
  }

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(0.5*1000) // del 'rxjs'
                        .pipe(
                          // map = para transformar la info que recibe el Observable y modificarla. Recibe el argumento que el Observable "padre" emite
                          map(valor => { return valor + 1 }),
                          // filter = para filtrar  la info que recibe el Observable para que sea procesada (true) o no (false)
                          filter( valor => {
                            return valor % 2 === 0; // Devuelve los pares
                          }),
                          // take = Operador que le dice cuántas emisiones del Observable se van a hacer. No "contará" los valores que "filter" NO procese
                          take(10), // Si lo ponemos como 1ª instrucción dentro del Pipe, imprime los pares del 2 al 10, 
                                    // pq al ejecutarse antes del "filter", cuenta tb los elementos que el filter descarta.
                                    // Aquí, imprime los pares del 2 al 20, pq cuenta 10 elementos que el "filter" NO descarta.
                        );
    return intervalo$;
  }
  // Creamos una función que devuelve un Observable
  retornaObservable(): Observable<number> {
    // El Subscriber "observer" (parámetro), es quien va a estar emitiendo los valores (cuándo termina, cuándo da error, ...).
    // Este Subscriber es quien va a decir cómo está el Observable y qué información está fluyendo a través de él.
    let i = 0;
    const obs$ = new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        observer.next(i); // Siguiente valor que queremos emitir
        if (i > 3) {
          clearInterval(intervalo);
          observer.complete(); // Cancelamos la emisión de valores del Observer
        }
        if (i === 2) {
          // i = 0;
          observer.error('error forzado!');
        }
      } , 1000);
    });

    return obs$;
  }
}
