import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProveedor'
})
export class FilterProveedorPipe implements PipeTransform {

  transform(proveedors: any[], value: string): unknown {
    if (!value)
      return proveedors;

    value = value.trim().toLowerCase();

    return proveedors.filter(e =>
      e.nombreContacto && e.nombreContacto.trim().toLowerCase().indexOf(value)>=0
      ||  e.empresa && e.empresa.trim().toLowerCase().indexOf(value)>=0

    )
  }

}
