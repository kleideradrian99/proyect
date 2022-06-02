import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { GeneralService } from 'app/services/general.service';

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
  toppings = new FormControl();
  toppingListTallas: string[] = ['10', '12', '14', 'S', 'M', 'L', 'XL', 'XXL'];
  toppingList: string[] = ['Proveedor 1', 'Proveedor 2', 'Proveedor 3', 'Proveedor 4', 'Proveedor 5', 'Proveedor '];



  constructor(private fb: FormBuilder, private _generalService: GeneralService, private _productoService: ProductsService,
    private router: Router, private aRouter: ActivatedRoute) {

    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.createProducto = this.fb.group({
      referencia: ['', Validators.required],
      nombre: ['', Validators.required],
      valorEntrada: ['', Validators.required],
      precioUSD: ['', Validators.required],
      valorSalida: ['', Validators.required],
      proveedor: ['', Validators.required],
      // tallas: ['', Validators.required],
      publicForm: [''],
      coleccion: [''],
      descripcion: ['']
    })

    this.esEditar();
  }

  agregarEditarProducto() {
    if (this.createProducto.invalid) {
      this._generalService.showNotification('bottom', 'right', '3', 'Error al agregar el producto, faltan campos por llenar');
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
      referencia: this.createProducto.value.referencia,
      nombre: this.createProducto.value.nombre,
      valorEntrada: this.createProducto.value.valorEntrada,
      precioUSD: this.createProducto.value.precioUSD,
      valorSalida: this.createProducto.value.valorSalida,
      proveedor: this.createProducto.value.proveedor,
      // talla: this.createProducto.value.talla,
      publicForm: this.createProducto.value.publicForm,
      coleccion: this.createProducto.value.coleccion,
      url_imagen: this.urlImages,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._productoService.agregarProducto(product).then(() => {
      this._generalService.showNotification('bottom', 'right', '2', 'Producto agregado exitosamente');
      this.router.navigate(['/product-list']);
      this.loading = false;
    }).catch(error => {
      this._generalService.showNotification('bottom', 'right', '3', 'Error al agregar el producto');
      console.log(error);
    })
  }

  EditarProducto(id: string) {
    const product: any = {
      referencia: this.createProducto.value.referencia,
      nombre: this.createProducto.value.nombre,
      valorEntrada: this.createProducto.value.valorEntrada,
      precioUSD: this.createProducto.value.precioUSD,
      valorSalida: this.createProducto.value.valorSalida,
      proveedor: this.createProducto.value.proveedor,
      // tala: this.createProducto.value.talla,
      publicForm: this.createProducto.value.publicForm,
      coleccion: this.createProducto.value.coleccion,
      url_imagen: this.urlImages,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._productoService.actualizarProducto(this.id, product).then(() => {
      this._generalService.showNotification('bottom', 'right', '1', 'Se actualizo el producto correctamente');
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
        this.urlImages = data.payload.data()['url_imagen'];
        this.createProducto.setValue({
          referencia: data.payload.data()['referencia'],
          nombre: data.payload.data()['nombre'],
          valorEntrada: data.payload.data()['valorEntrada'],
          precioUSD: data.payload.data()['precioUSD'],
          valorSalida: data.payload.data()['valorSalida'],
          proveedor: data.payload.data()['proveedor'],
          // talla: data.payload.data()['talla'],
          publicForm: data.payload.data()['publicForm'],
          coleccion: data.payload.data()['coleccion']
        })
        console.log(this.createProducto);
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
      })
    }
  }
}
