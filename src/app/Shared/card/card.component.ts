import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';

import { ProductModel } from '../product.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() product!: ProductModel;
  @Input() index!: number;

  cartNumber: number = 0;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  plusValue() {
    if (this.product.selectedQuantity < this.product.quantity) {
      this.product.selectedQuantity++;
      this.product.availableQuantity--;
    }
    // console.log(this.product.quantity);
    // console.log(this.product.selectedQuantity);
    // console.log(this.product.availableQuantity);
  }
  minusValue() {
    if (this.product.selectedQuantity > 0) {
      this.product.selectedQuantity--;
      this.product.availableQuantity++;
    }
  }

  onAddToCart(product: ProductModel) {
    //this.productService.totalCart.next(this.cartNumber);
    // console.log(this.cartNumber);
    this.productService.AddCart(product);
  }
}
