import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  toppingList: string[] = ['Jeans', 'Pantalones', 'Zapatos', 'Esterisos', 'Accesorio', 'Busos'];

  constructor(private _productoService: ProductsService) { }

  ngOnInit(): void {
  }

}
