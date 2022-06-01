import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Observable } from 'rxjs';

declare var $: any;
firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class ProveedorsService {

  storareRef = firebase.app().storage().ref();

  constructor(private firestore: AngularFirestore, private _angularFireStorage: AngularFireStorage) { }

  agregarProveedor(proveedor: any): Promise<any> {
    return this.firestore.collection('proveedores').add(proveedor);
  }

  getProveedors(): Observable<any> {
    return this.firestore.collection('proveedores').snapshotChanges();
  }

  eliminarProveedor(id: string): Promise<any> {
    return this.firestore.collection('proveedores').doc(id).delete();
  }

  getProveedor(id: string): Observable<any> {
    return this.firestore.collection('proveedores').doc(id).snapshotChanges();
  }

  actualizarProveedor(id: string, data: any): Promise<any> {
    return this.firestore.collection('proveedores').doc(id).update(data);
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
