import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
// import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ListProductsComponent } from 'app/products/list-products/list-products.component';
import { CreateProductsComponent } from 'app/products/create-products/create-products.component';
import { ListOrdersComponent } from 'app/orders/list-orders/list-orders.component';
import { ListProveedorComponent } from 'app/proveedors/list-proveedor/list-proveedor.component';
import { CreateProveedorComponent } from 'app/proveedors/create-proveedor/create-proveedor.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'product-list', component: ListProductsComponent },
    { path: 'create-product', component: CreateProductsComponent },
    { path: 'editProducto/:id', component: CreateProductsComponent },
    { path: 'list-proveedor', component: ListProveedorComponent },
    { path: 'create-proveedor', component: CreateProveedorComponent },
    { path: 'editProveedor/:id', component: CreateProveedorComponent },
    { path: 'orders-list', component: ListOrdersComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
];
