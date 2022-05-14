import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PageEvent } from '@angular/material/paginator';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  productos: any[] = [];
  public search: string = '';
  // dataSource: any;

  constructor(private _productoService: ProductsService) {

  }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos() {
    this._productoService.getProductos().subscribe(data => {
      this.productos = [];
      data.forEach((element: any) => {
        // this.dataSource = new MatTableDataSource(element.payload.doc.data());
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarProducto(id: string) {
    this._productoService.eliminarProducto(id).then(() => {
      // console.log('Producto eliminado');
      this._productoService.showNotification('bottom', 'right', '3', 'Producto Eliminado Correctamente');
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

  onSearchProduct(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
