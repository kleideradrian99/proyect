import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'dashboard', class: '' },
    { path: '/orders-list', title: 'Ordenes',  icon:'library_books', class: '' },
    { path: '/product-list', title: 'Productos',  icon:'library_books', class: '' },
    { path: '/list-proveedor', title: 'Proveedor',  icon:'category', class: '' },
    { path: '/list-clients', title: 'Clientes',  icon:'person', class: '' },


    // { path: '/typography', title: 'Configuracion General',  icon:'library_books', class: '' },
    // { path: '/user-profile', title: 'Clientes',  icon:'person', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
