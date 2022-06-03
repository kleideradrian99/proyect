import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Observable } from 'rxjs';

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
}
