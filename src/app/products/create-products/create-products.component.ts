import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {

  createProducto: FormGroup;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';
  tituloButton = 'Agregar';

  constructor(private fb: FormBuilder, private _productoService: ProductsService,
    private router: Router, private aRouter: ActivatedRoute) {
    this.createProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      talla: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarProducto() {
    if (this.createProducto.invalid) {
      this._productoService.showNotification('bottom', 'right', '4', 'Error al agregar el producto, faltan campos por llenar');
      return;
    }

    if (this.id === null) {
      this.agregarProducto();
    } else {
      this.EditarProducto(this.id);
    }
  }

  agregarProducto() {
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
    }).catch(error => {
      this._productoService.showNotification('bottom', 'right', '4', 'Error al agregar el producto');
      console.log(error);
    })
  }

  EditarProducto(id: string) {
    const product: any = {
      nombre: this.createProducto.value.nombre,
      precio: this.createProducto.value.precio,
      talla: this.createProducto.value.talla,
      categoria: this.createProducto.value.categoria,
      descripcion: this.createProducto.value.descripcion,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._productoService.actualizarProducto(this.id, product).then(() => {
      this._productoService.showNotification('bottom', 'right', '1', 'Se actualizo el producto correctamente');
      this.router.navigate(['/product-list']);
      this.loading = false;
    }).catch(error => {
      console.log(error);
    })
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this.tituloButton = 'Actualizar';
      this._productoService.getProducto(this.id).subscribe(data => {
        this.createProducto.setValue({
          nombre: data.payload.data()['nombre'],
          precio: data.payload.data()['precio'],
          talla: data.payload.data()['talla'],
          categoria: data.payload.data()['categoria'],
          descripcion: data.payload.data()['descripcion']
        })
      })
    }
  }
}
