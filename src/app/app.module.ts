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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

// Modulos Firebase
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

import {MatSelectModule} from '@angular/material/select';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FilterProductsPipe } from './products/list-products/filter-products.pipe';

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
    MatSelectModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListProductsComponent,
    CreateProductsComponent,
    ListCategoryComponent,
    FilterProductsPipe,

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[FilterProductsPipe]
})
export class AppModule { }
