import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GeneralService } from 'app/services/general.service';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  clientes: any[] = [];
  public search: string = "";
  filterValue: string = "";

  constructor(private _clienteService: ClientsService, private _generalService: GeneralService) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente() {
    this._clienteService.getClientes().subscribe(data => {
      this.clientes = [];
      data.forEach((element: any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }

  eliminarCliente(id: string) {
    this._clienteService.eliminarCliente(id).then(() => {
      this._generalService.showNotification('bottom', 'right', '3', 'Cliente Eliminado Correctamente');
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

}
