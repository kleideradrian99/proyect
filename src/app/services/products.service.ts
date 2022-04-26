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
export class ProductsService {
  storareRef = firebase.app().storage().ref();

  constructor(private firestore: AngularFirestore, private _angularFireStorage: AngularFireStorage) { }

  agregarProducto(producto: any): Promise<any> {
    return this.firestore.collection('productos').add(producto);
  }

  getProductos(): Observable<any> {
    return this.firestore.collection('productos', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarProducto(id: string): Promise<any> {
    return this.firestore.collection('productos').doc(id).delete();
  }

  getProducto(id: string): Observable<any> {
    return this.firestore.collection('productos').doc(id).snapshotChanges();
  }

  actualizarProducto(id: string, data: any): Promise<any> {
    return this.firestore.collection('productos').doc(id).update(data);
  }

  async subirImagen(nombre: string, imgB64: File) {
    try {
      // let respuesta = await this.storareRef.child("users/"+nombre).putString(imgB64, 'data_url');
      // return await respuesta.ref.getDownloadURL();}
      let respuesta = this._angularFireStorage.upload("products/" + nombre, imgB64);
      console.log(respuesta)
      return (await respuesta).ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
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
