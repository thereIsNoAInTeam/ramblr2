import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Topn pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'topn'
})
@Injectable()
export class Topn {

  transform(value: any[], args) {
      let buffer = [];
      console.log(value);
      console.log(buffer);
      for(let i = 0; i <args; i++){
          if(i >= value.length){
              break;
          }
          buffer.push(value[i]);
      }
      console.log(buffer);
      return buffer;
  }
}
