import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {


  suscripcion: Subscription;

  constructor() {

  this.suscripcion = this.regresaObservable().pipe(
    retry(2) // numero de intentos que se quiere hacer
   )
  .subscribe(
    numero => console.log( 'subs', numero ),
    error => console.log( 'error en el obs', error ),
    () => console.log( 'el observador termino' )
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log( 'la pagina se cierra' );
    this.suscripcion.unsubscribe();
  }

  regresaObservable(): Observable< any > {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval( () => {

      contador += 1;

      const salida = {
        valor: contador
      };

      observer.next( salida );

     // if ( contador === 3 ) {
     //   clearInterval(intervalo)
     //   observer.complete();
     // }

      // if ( contador === 2 ) {
       // clearInterval(intervalo);
      //  observer.error('Aiudaaaa');
      // }

      }, 1000);

    }).pipe(
      map( resp => resp.valor),
      filter( ( valor, index ) => {

        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }

      } )
     );


  }

}
