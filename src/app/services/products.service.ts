import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

  agregarProducto(producto: any):Promise<any> {
    return this.firestore.collection('productos').add(producto);
  }

  getProductos(): Observable<any>{
    return this.firestore.collection('productos', ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }

  eliminarProducto(id: string): Promise<any>{
    return this.firestore.collection('productos').doc(id).delete();
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
