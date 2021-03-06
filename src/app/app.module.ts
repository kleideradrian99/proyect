import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { CreateProductsComponent } from './products/create-products/create-products.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

// Modulos Firebase
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterProductsPipe } from './products/list-products/filter-products.pipe';
import { ListOrdersComponent } from './orders/list-orders/list-orders.component';
import { CreateOrdersComponent } from './orders/create-orders/create-orders.component';
import { MatTableModule } from '@angular/material/table';
import { CreateProveedorComponent } from './proveedors/create-proveedor/create-proveedor.component';
import { ListProveedorComponent } from './proveedors/list-proveedor/list-proveedor.component';
import { FilterProveedorPipe } from './proveedors/list-proveedor/filter-proveedor.pipe';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { CreateClientsComponent } from './clients/create-clients/create-clients.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    MatSelectModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListProductsComponent,
    CreateProductsComponent,
    FilterProductsPipe,
    FilterProveedorPipe,
    ListOrdersComponent,
    CreateOrdersComponent,
    CreateProveedorComponent,
    ListProveedorComponent,
    ListClientsComponent,
    CreateClientsComponent,

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FilterProductsPipe, FilterProveedorPipe],
  
})
export class AppModule { }
