import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { ProductModel } from '../Shared/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productItems!: ProductModel[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productItems = this.productService.getProductItems();
    this.productService.productItemChanged.subscribe(
      (productItems: ProductModel[]) => {
        this.productItems = productItems;
      }
    );
  }
}
