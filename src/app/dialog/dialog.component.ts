import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProductService } from '../Service/product.service';
import { ProductModel } from '../Shared/product.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;
  editMode = false;
  public editedItemIndex!: string;

  constructor(
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public passedData: ProductModel
  ) {}

  ngOnInit() {
    if (this.passedData) {
      this.editMode = true;
      this.editForm(this.passedData);
    } else {
      this.initForm();
    }
  }
  initForm() {
    this.productForm = new FormGroup({
      id: new FormControl(uuidv4()),
      name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      imagePath: new FormControl(null),
      quantity: new FormControl(null, Validators.required),
      selectedQuantity: new FormControl(null, Validators.required),
      availableQuantity: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });
  }
  editForm(data: ProductModel) {
    this.productForm = new FormGroup({
      id: new FormControl(data.id),
      name: new FormControl(data.name, Validators.required),
      category: new FormControl(data.category, Validators.required),
      imagePath: new FormControl(data.imagePath),
      quantity: new FormControl(data.quantity, Validators.required),
      selectedQuantity: new FormControl(
        data.selectedQuantity,
        Validators.required
      ),
      availableQuantity: new FormControl(
        data.availableQuantity,
        Validators.required
      ),
      price: new FormControl(data.price, Validators.required),
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.productService.updateProductItem(
        this.passedData.id,
        this.productForm.value
      );
    } else {
      this.productService.addProductItem(this.productForm.value);
      console.log(this.productForm.value);
    }
  }
}
