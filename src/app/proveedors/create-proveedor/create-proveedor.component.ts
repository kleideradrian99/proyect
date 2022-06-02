import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorsService } from '../proveedors.service';

@Component({
  selector: 'create-proveedor',
  templateUrl: './create-proveedor.component.html',
  styleUrls: ['./create-proveedor.component.css']
})
export class CreateProveedorComponent implements OnInit {


  createProveedor: FormGroup;
  id: string | null;

  constructor(private fb: FormBuilder, private _proveedorService: ProveedorsService,
    private router: Router, private aRouter: ActivatedRoute) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.createProveedor = this.fb.group({
      nombreContacto: ['', Validators.required],
      empresa: ['', Validators.required],
      ciudad: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required]
    })
  }

  agregarEditarProducto() {
    if (this.createProveedor.invalid) {
      console.log('Faltan Campos por lllenas');
      return;
    }

    if (this.id === null) {
      this.agregarProveedor();
    } else {
      // Editar
    }
  }

  agregarProveedor() {
    const proveedor: any = {
      nombreContacto: this.createProveedor.value.nombreContacto,
      empresa: this.createProveedor.value.empresa,
      ciudad: this.createProveedor.value.ciudad,
      email: this.createProveedor.value.email,
      telefono: this.createProveedor.value
    }
    this._proveedorService.agregarProveedor(proveedor).then(() => {
      console.log('Proveedor agregado correctamente');
      this.router.navigate['/list-proveedor'];
    }).catch(error => {
      console.log("Error al imprimir");
      console.log(error);
    })
  }

}
