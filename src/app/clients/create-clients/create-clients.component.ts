import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'app/services/general.service';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.css']
})
export class CreateClientsComponent implements OnInit {

  crearCliente: FormGroup;
  id: string | null;
  tituloButton = 'Agregar';
  titulo = 'Agregar Cliente';
  loading = false;

  constructor(private fb: FormBuilder, private _generalService: GeneralService, private _clienteService: ClientsService,
    private router: Router, private aRouter: ActivatedRoute) {
    // this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.crearCliente = this.fb.group({
      nombre: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      email: ['', Validators.required]
    })
    this.esEditar();
  }

  agregarEditarCliente() {
    if (this.crearCliente.invalid) {
      this._generalService.showNotification('bottom', 'right', '3', 'Error al agregar el Cliente, faltan campos por llenar');
      return;
    }


    if (this.id === null) {
      this.agregarCliente();
    } else {
      this.editarCliente(this.id);
    }

  }

  agregarCliente() {
    const cliente: any = {
      nombre: this.crearCliente.value.nombre,
      celular: this.crearCliente.value.celular,
      direccion: this.crearCliente.value.direccion,
      pais: this.crearCliente.value.pais,
      email: this.crearCliente.value.email
    }
    this.loading = true;
    this._clienteService.agregarCliente(cliente).then(() => {
      this._generalService.showNotification('bottom', 'right', '2', 'Cliente agregado exitosamente');
      this.router.navigate['/list-clients'];
      this.loading = false;
    }).catch(error => {
      this._generalService.showNotification('bottom', 'right', '3', 'Error al agregar el cliente');
      console.log(error);
    })
  }

  editarCliente(id: string) {
    const cliente: any = {
      nombre: this.crearCliente.value.nombre,
      celular: this.crearCliente.value.celular,
      direccion: this.crearCliente.value.direccion,
      pais: this.crearCliente.value.pais,
      email: this.crearCliente.value.email
    }
    this.loading = true;
    this._clienteService.actualizarCliente(this.id, cliente).then(() => {
      this._generalService.showNotification('bottom', 'right', '1', 'Se actualizo el cliente correctamente');
      this.router.navigate['list-clients'];
      this.loading = false;
    }).catch(error => {
      console.log(error);
    })
  }

  esEditar() {
    if (this.id !== null) {
      this.tituloButton = 'Actualizar';
      this.titulo = 'Actualizar Proveedor';
      this._clienteService.getCliente(this.id).subscribe(data => {
        this.crearCliente.setValue({
          nombre: data.payload.data()['nombre'],
          celular: data.payload.data()['celular'],
          direccion: data.payload.data()['direccion'],
          pais: data.payload.data()['pais'],
          email: data.payload.data()['email']
        })
      })
    }
  }

}
