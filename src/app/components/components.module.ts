import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraphDoughnutComponent } from './graph-doughnut/graph-doughnut.component';
import { ModalImageComponent } from './modal-image/modal-image.component';


@NgModule({
  declarations: [IncrementadorComponent, GraphDoughnutComponent, ModalImageComponent],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,  // Para poder trabajar con el ngModel (Inputs)
  ],
  exports: [
    IncrementadorComponent,
    GraphDoughnutComponent,
    ModalImageComponent,
  ]
})
export class ComponentsModule { }
