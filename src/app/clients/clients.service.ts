import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  storaRef = firebase.app().storage().ref();

  constructor(private firestore: AngularFirestore, private _angularFireStorage: AngularFireStorage) { }

  agregarCliente(cliente: any): Promise<any> {
    return this.firestore.collection('clientes').add(cliente);
  }

  getClientes(): Observable<any> {
    return this.firestore.collection('clientes').snapshotChanges();
  }

  eliminarCliente(id: string): Promise<any> {
    return this.firestore.collection('clientes').doc(id).delete();
  }

  getCliente(id: string): Observable<any>{
    return this.firestore.collection('clientes').doc(id).snapshotChanges();
  }

  actualizarCliente(id: string, data: any): Promise<any> {
    return this.firestore.collection('clientes').doc(id).update(data);
  }
}
