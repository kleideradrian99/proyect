import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  productos: any[] = [];

  constructor(private _productoService: ProductsService) {

  }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos() {
    this._productoService.getProductos().subscribe(data => {
      this.productos = [];
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.productos);
    });
  }

  eliminarProducto(id: string){
    this._productoService.eliminarProducto(id).then(() => {
      // console.log('Producto eliminado');
      this._productoService.showNotification('bottom', 'right', '3', 'Producto Eliminado Correctamente');
    }).catch(error =>{
      console.log(error);
    })
  }

}
