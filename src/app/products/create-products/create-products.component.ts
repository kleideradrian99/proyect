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
  submitted = false;

  constructor(private fb: FormBuilder, private _productoService: ProductsService,
              private router: Router) {
    this.createProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      talla: ['', Validators.required],
      categoria: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarProducto() {
    if (this.createProducto.invalid) {
      this.showNotification('bottom', 'right', '4', 'Error al agregar el producto, faltan campos por llenar');
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
      this._productoService.agregarProducto(product).then(() => {
        this.showNotification('bottom', 'right', '2', 'Producto agregado exitosamente');
        this.router.navigate(['/product-list']);
      }).catch(error =>{
        this.showNotification('bottom', 'right', '4', 'Error al agregar el producto');
      })
    }

  }

  showNotification(from, align, numberType, newMessage) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    // const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: newMessage

    }, {
      type: type[numberType],
      timer: 300,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}
