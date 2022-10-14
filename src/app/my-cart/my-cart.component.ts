import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from '../Service/product.service';
import { ProductModel } from '../Shared/product.model';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit {
  //cartItems!: ProductModel[];
  subscription!: Subscription;
  constructor(private productService: ProductService) {}
  dataSource = new MatTableDataSource<ProductModel>();

  ngOnInit() {
    this.dataSource.data = this.productService.getCartItem();
    this.productService.cartItemChanged.subscribe((res) => {
      this.dataSource.data = res;
    });
  }
  displayedColumns: string[] = [
    'name',
    'imagePath',
    'selectedQuantity',
    'availableQuantity',
    'price',
    'actions',
  ];

  onUpdatePlusCart(id: string, item: ProductModel) {
    this.productService.updatePlusCart(id, item);
  }
  onUpdateMinusCart(id: string, item: ProductModel) {
    this.productService.updateMinusCart(id, item);
  }
  getTotalCost() {
    return this.dataSource.data
      .map((t) => t.price)
      .reduce((acc, value) => acc + value, 0);
  }
  // onUpdatePrice(id: string, item: ProductModel) {}
  onDelete(id: string) {
    this.productService.deleteCart(id);
  }
}
