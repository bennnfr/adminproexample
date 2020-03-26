import { Component, ViewChild, Input, Output, OnInit, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;

  // tslint:disable-next-line: no-input-rename
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges( newValue: number ) {

   // let elemHTML: any = document.getElementsByName('porcentaje')[0];

    if ( newValue >= 100 ) {
      this.porcentaje = 100;
    } else if ( newValue <= 0 ) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

   // elemHTML.value = Number( this.porcentaje );
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit( this.porcentaje );
    this.txtProgress.nativeElement.focus();
  }

  cambiarValor( valor ) {


    if ( this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }

    if ( this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + valor;

    this.cambioValor.emit( this.porcentaje );

}

}
