import { Component, Input, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-graph-doughnut',
  templateUrl: './graph-doughnut.component.html',
  styles: [
  ]
})
export class GraphDoughnutComponent implements OnInit {
  @Input('title') graphTitle: string = '-'; // Inicializamos mediante parámetro que deberemos asignar en el onInit
  // @Input('labels') graphLables: Label[] = [''];
  @Input('labels') doughnutChartLabels: Label[] = ['']; // Tb podemos inicializar directamente
  @Input('colors') graphColors: string[] = ['']; // Inicializamos mediante parámetro que deberemos asignar en el onInit
  @Input('data') graphData: number[] = []; // Inicializamos mediante parámetro que deberemos asignar en el onInit

  public doughnutChartTitle: string;
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutColors: Color[];

  constructor() { }

  ngOnInit(): void {
    this.doughnutChartTitle = this.graphTitle;
  //  this.doughnutChartLabels = this.graphLabels;
    this.doughnutChartData = [ this.graphData ];
    this.doughnutColors = [
      { backgroundColor: this.graphColors}
    ];
  }



}
