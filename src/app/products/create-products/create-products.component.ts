import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'app/services/products.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {

  createProducto: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _productoService: ProductsService,
              private router: Router) {
    this.createProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      talla: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarProducto() {
    if (this.createProducto.invalid) {
     this._productoService.showNotification('bottom', 'right', '4', 'Error al agregar el producto, faltan campos por llenar');
    } else {
      const product: any = {
        nombre: this.createProducto.value.nombre,
        precio: this.createProducto.value.precio,
        talla: this.createProducto.value.talla,
        categoria: this.createProducto.value.categoria,
        descripcion: this.createProducto.value.descripcion,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }
      this.loading = true;
      this._productoService.agregarProducto(product).then(() => {
        this._productoService.showNotification('bottom', 'right', '2', 'Producto agregado exitosamente');
        this.router.navigate(['/product-list']);
        this.loading = false;
      }).catch(error =>{
        this._productoService.showNotification('bottom', 'right', '4', 'Error al agregar el producto');
      })
    }
  }
}
