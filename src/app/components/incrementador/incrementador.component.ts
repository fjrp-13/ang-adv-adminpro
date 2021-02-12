import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // Decorador @Input() le indica que este componente puede recibir una propiedad (progress) desde el Padre
  // @Input('alias') progress: number = 80; --> El padre deberá especificar 'alias' en vez de 'progress' para pasarle a este componente el valor
  @Input('valor') value: number = 80;
  @Input() btnClass: string = 'btn-primary';

  // Los Output() son de tipo EventEmitter: una función que el componente Padre podrá llamar
  @Output('valor') retrieveValue: EventEmitter<number> = new EventEmitter();
  
  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  get getPercentage() {
    return `${ this.value }%`;
  }

  changeValue(valor: number) {
    this.value = this.value + valor;
    if (this.value > 100) {
      this.value = 100;
    } else if (this.value < 0) {
      this.value = 0;
    }

    this.retrieveValue.emit(this.value);
  }

  onChange(newValue: number) {
    let _value = newValue;
    if (_value > 100) {
      _value = 100;
    } else if(_value < 0) {
      _value = 0;
    }
    // Emitimos "newValue" para que el campo mantenga lo que haya escrito el usuario
    this.retrieveValue.emit(newValue);

  }
}
