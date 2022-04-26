import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';

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
      url_imagen: this.urlImages,
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
      url_imagen: this.urlImages,
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
          url_imagen: data.payload.data()['url_imagen'],
          descripcion: data.payload.data()['descripcion']
        })
      })
    }
  }

  imagen: any[] = [];
  urlImages = environment.baseUrlimg;
  cargarImagen(event: any) {
    let archivo: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      // console.log(reader.result)
      this.imagen.push(reader.result)
      this._productoService.subirImagen(archivo.name, archivo).then(urlImagen => {
        this.urlImages = urlImagen;
        // this.urlImages += "products/" + archivo.name
        console.log(urlImagen)

      })
    }
  }
}
