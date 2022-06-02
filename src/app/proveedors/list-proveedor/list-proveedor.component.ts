import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { PageEvent } from '@angular/material/paginator';
import { ProveedorsService } from '../proveedors.service';

@Component({
  selector: 'list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.css']
})
export class ListProveedorComponent implements OnInit {

  proveedors: any[] = [];
  public search: string = '';
  filterValue: string = "";

  constructor(private _proveedorService: ProveedorsService) { }

  ngOnInit(): void {
    this.getProveedor();
  }

  getProveedor() {
    this._proveedorService.getProveedors().subscribe(data => {
      this.proveedors = [];
      data.forEach((element: any) => {
        this.proveedors.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarProveedor(id: string) {
    this._proveedorService.eliminarProveedor(id).then(() => {
      console.log('Proveedor Eliminado');
    }).catch(error => {
      console.log(error);
    })
  }


  // Paginación Table
  pageSize = 5;
  desde: number = 0;
  hasta: number = 5;
  cambiarPagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }



}
