import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ProductModel } from '../Shared/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productItemChanged = new Subject<ProductModel[]>();
  cartItemChanged = new Subject<ProductModel[]>();

  constructor() {}

  public cartItems: ProductModel[] = [];

  public productItems: ProductModel[] = [
    new ProductModel(
      '666666666666',
      'Sony TV',
      'Electronics',
      'https://www.bdstall.com/asset/product-image/giant_53905.jpg',
      5,
      0,
      5,
      30000
    ),
    new ProductModel(
      '777777777777',
      'Lg Curve TV',
      'Electronics',
      'https://www.fossil.com/on/demandware.static/-/Library-Sites-FossilSharedLibrary/default/dwd2f408dd/IC/FA22/0801_IC_FossilBlue.jpg',
      5,
      0,
      5,
      45000
    ),
    new ProductModel(
      '888888888888',
      'Samsung TV',
      'Electronics',
      'https://gadgetnmusic.com/wp-content/uploads/2021/10/xiaomi-xiaomi-mi-tv-p1-32-inch.jpg',
      5,
      0,
      5,
      35000
    ),
    new ProductModel(
      '999999999999',
      'Walton TV',
      'Electronics',
      'https://images-na.ssl-images-amazon.com/images/G/01/us-manual-merchandising/71oJWgey-WL._CB628011260_SR300_.jpg',
      5,
      0,
      5,
      40000
    ),
    new ProductModel(
      '222222222',
      'Walton TV',
      'Electronics',
      'https://images.samsung.com/is/image/samsung/latin-en-uhdtv-nu8500-un65nu8500pxpa-rperspectiveblack-121406984?$720_576_PNG$',
      5,
      0,
      5,
      38000
    ),
    new ProductModel(
      '3333333333',
      'Singer TV',
      'Electronics',
      'https://www.mke.com.bd/pub/media/catalog/product/cache/5e7137fa7c7aaf97915b9daa048ff0e1/5/9/59ae6e223c053_1504603682.jpg',
      5,
      0,
      5,
      38000
    ),
  ];

  getProductItems() {
    return this.productItems.slice();
  }
  addProductItem(item: ProductModel) {
    this.productItems.push(item);
    this.productItemChanged.next(this.productItems.slice());
  }
  updateProductItem(id: string, upDateItem: ProductModel) {
    const index = this.productItems.findIndex((checkItem: ProductModel) => {
      return checkItem.id === id;
    });

    this.productItems[index] = upDateItem;
    this.productItemChanged.next(this.productItems.slice());
  }
  deleteProductItem(id: string) {
    const itemIndex = this.productItems.findIndex((checkItem: ProductModel) => {
      return checkItem.id === id;
    });

    this.productItems.splice(itemIndex, 1);
    this.productItemChanged.next(this.productItems.slice());
  }

  //All Card and Cart related Service

  getCartItem() {
    return this.cartItems.slice();
  }
  AddCart(cartItem: ProductModel) {
    if (!this.cartItems.includes(cartItem)) {
      this.cartItems.push(cartItem);
      this.cartItemChanged.next(this.cartItems.slice());
    }
  }
  updatePlusCart(id: string, cartItem: ProductModel) {
    const cartIndex = this.productItems.findIndex((checkItem: ProductModel) => {
      return checkItem.id === id;
    });

    if (cartItem.selectedQuantity < cartItem.quantity) {
      cartItem.selectedQuantity++;
      cartItem.availableQuantity--;
    }

    this.productItems[cartIndex] = cartItem;
    this.productItemChanged.next(this.productItems.slice());
  }
  updateMinusCart(id: string, cartItem: ProductModel) {
    const cartmIndex = this.productItems.findIndex(
      (checkItem: ProductModel) => {
        return checkItem.id === id;
      }
    );
    if (cartItem.selectedQuantity > 0) {
      cartItem.selectedQuantity--;
      cartItem.availableQuantity++;
    }
    this.productItems[cartmIndex] = cartItem;
    this.productItemChanged.next(this.productItems.slice());
  }
  deleteCart(id: string) {
    const deleteIndex = this.cartItems.findIndex((checkItem) => {
      return checkItem.id === id;
    });
    this.cartItems.splice(deleteIndex, 1);
    this.cartItemChanged.next(this.cartItems.slice());
  }
  // updatePrice(id:string,cartItem:ProductModel) {
  //   const pIndex = this.cartItems.findIndex((checkItem) => {
  //     checkItem.id === id;
  //   });
  //   if(cartItem.price>0){

  //   }
  // }
}
