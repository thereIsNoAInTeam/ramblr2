import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Bio pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'bio'
})
@Injectable()
export class Bio {

  transform(value, args) {

      if(!value){
          return value;
      }

      let buffer = value.split("\n");
      value = "<p>";

      for(let x in buffer) {
          value += buffer[x] + "</p>";
          if(x !> buffer.length){
              value+="<p>";
          }
      }

      return value;
  }
}
