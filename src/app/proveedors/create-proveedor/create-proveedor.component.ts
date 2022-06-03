import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'app/services/general.service';
import { ProveedorsService } from '../proveedors.service';

@Component({
  selector: 'create-proveedor',
  templateUrl: './create-proveedor.component.html',
  styleUrls: ['./create-proveedor.component.css']
})
export class CreateProveedorComponent implements OnInit {


  createProveedor: FormGroup;
  id: string | null;
  tituloButton = 'Agregar';
  titulo = 'Agregar Empleado';
  loading = false;

  constructor(private fb: FormBuilder, private _generalService: GeneralService, private _proveedorService: ProveedorsService,
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
    this.esEditar();
  }

  agregarEditarProveedor() {
    if (this.createProveedor.invalid) {
      this._generalService.showNotification('bottom', 'right', '3', 'Error al agregar el proveedor, faltan campos por llenar');
      return;
    }

    if (this.id === null) {
      this.agregarProveedor();
    } else {
      this.editarProveedor(this.id);
    }
  }

  agregarProveedor() {
    const proveedor: any = {
      nombreContacto: this.createProveedor.value.nombreContacto,
      empresa: this.createProveedor.value.empresa,
      ciudad: this.createProveedor.value.ciudad,
      email: this.createProveedor.value.email,
      telefono: this.createProveedor.value.telefono
    }
    this.loading = true;
    this._proveedorService.agregarProveedor(proveedor).then(() => {
      this._generalService.showNotification('bottom', 'right', '2', 'Proveedor agregado exitosamente');
      this.router.navigate['/list-proveedor'];
      this.loading = false;
    }).catch(error => {
      this._generalService.showNotification('bottom', 'right', '3', 'Error al agregar el proveedor');
      console.log(error);
    })
  }

  editarProveedor(id: string) {
    const proveedor: any = {
      nombreContacto: this.createProveedor.value.nombreContacto,
      empresa: this.createProveedor.value.empresa,
      ciudad: this.createProveedor.value.ciudad,
      email: this.createProveedor.value.email,
      telefono: this.createProveedor.value.telefono
    }
    this.loading = true;
    this._proveedorService.actualizarProveedor(this.id, proveedor).then(() => {
      this._generalService.showNotification('bottom', 'right', '1', 'Se actualizo el proveedor correctamente');
      this.router.navigate(['/list-proveedor']);
      this.loading = false;
    }).catch(error => {
      console.log(error);
    })
  }

  esEditar() {
    if (this.id !== null) {
      this.tituloButton = 'Actualizar';
      this.titulo = 'Actualizar Proveedor';
      this._proveedorService.getProveedor(this.id).subscribe(data => {
        this.createProveedor.setValue({
          nombreContacto: data.payload.data()['nombreContacto'],
          empresa: data.payload.data()['empresa'],
          ciudad: data.payload.data()['ciudad'],
          email: data.payload.data()['email'],
          telefono: data.payload.data()['telefono']
        })
      })

    }
  }

}
