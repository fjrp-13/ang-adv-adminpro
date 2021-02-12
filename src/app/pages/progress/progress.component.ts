import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent implements OnInit {

  progress1: number = 75;
  progress2: number = 5;
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  get getProgress1() {
    return this.progress1;
  }

  get getProgress2() {
    return this.progress2;
  }

  get getPercentage1() {
    return `${ this.progress1 }%`;
  }
  get getPercentage2() {
    return `${ this.progress2 }%`;
  }

}
