import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(productos:any[], value:string): unknown {
    if(!value)
    return productos;

    value= value.trim().toLowerCase();

    return productos.filter(e=> 
      e.nombre && e.nombre.trim().toLowerCase().indexOf(value)>=0
      ||  e.categoria && e.categoria.trim().toLowerCase().indexOf(value)>=0
      )
  }

}
