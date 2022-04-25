import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

  agregarProducto(producto: any):Promise<any> {
    return this.firestore.collection('productos').add(producto);
  }
}
