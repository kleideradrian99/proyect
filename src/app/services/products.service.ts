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
}
