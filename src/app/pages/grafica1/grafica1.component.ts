import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public graph1Title: string = 'Gráfica 01';
  public graph2Title: string = 'Gráfica 02';
  public graph3Title: string = 'Gráfica 03';

  public graph1Labels: string[] = ['Graph 1 - Label 1', 'Graph 1 - Label 2', 'Graph 1 - Label 3'];
  public graph2Labels: string[] = ['Graph 2 - Label 1', 'Graph 2 - Label 2', 'Graph 2 - Label 3'];
  public graph3Labels: string[] = ['Graph 3 - Label 1', 'Graph 3 - Label 2', 'Graph 3 - Label 3'];
  //public graph4Labels: string[] = [];
  
  public graph1Data: number[] = [350, 450, 100];
  public graph2Data: number[] = [125, 225, 325];
  public graph3Data: number[] = [25, 60, 15];

  public graph1Colors: string[] = ['#6857E6', '#009FEE', '#F02059'];
  public graph2Colors: string[] = ['#FF0000', '#00FF00', '#0000FF'];
  public graph3Colors: string[] = ['#231546', '#789465', '#936741'];

}
