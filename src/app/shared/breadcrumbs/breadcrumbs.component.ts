import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public title: string;
  public titleSubs$: Subscription; // Para almacenar la subscripción al Observable y poder "cancelar" la subscripción

  constructor(private router: Router) { 
//    this.getRouterData_v1();
    this.titleSubs$ = this.getRouterData()
                          .subscribe( ({title}) => { // Equivale a lo de arriba, pero aquí "desestructuramos" el objeto "data" y obtenemos sólo su propiedad "title"
                            this.title = title;
                            document.title = `AdminPro - ${ title }`
                          });
  }

  ngOnDestroy(): void {
    // Cancelamos la subscripción
    this.titleSubs$.unsubscribe();
  }

  // Devuelve el Observable para que podamos almacenar la subscripción
  getRouterData() {
    return this.router.events
    .pipe(
      filter( event => {return event instanceof ActivationEnd;}), // filter( event => event instanceof ActivationEnd )
      filter( (event :ActivationEnd) => {return event.snapshot.firstChild === null}),
      map( (event :ActivationEnd) => {return event.snapshot.data} )
    );
  }

  // No devuelve nada
  getRouterData_v1() {
    this.router.events
    .pipe(
      filter( event => {return event instanceof ActivationEnd;}), // filter( event => event instanceof ActivationEnd )
      filter( (event :ActivationEnd) => {return event.snapshot.firstChild === null}),
      map( (event :ActivationEnd) => {return event.snapshot.data} )
    )
    // .subscribe( data => {
    //   this.title = data.title;
    // });
    .subscribe( ({title}) => { // Equivale a lo de arriba, pero aquí "desestructuramos" el objeto "data" y obtenemos sólo su propiedad "title"
      this.title = title;
      document.title = `AdminPro - ${ title }`
    });
  }

}
