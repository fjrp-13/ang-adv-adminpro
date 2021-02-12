import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraphDoughnutComponent } from './graph-doughnut/graph-doughnut.component';


@NgModule({
  declarations: [IncrementadorComponent, GraphDoughnutComponent],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,  // Para poder trabajar con el ngModel (Inputs)
  ],
  exports: [
    IncrementadorComponent,
    GraphDoughnutComponent
  ]
})
export class ComponentsModule { }
