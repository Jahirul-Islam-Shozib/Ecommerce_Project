import {
  AfterViewInit,
  Component,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductService } from '../Service/product.service';
import { ProductModel } from '../Shared/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { WarningDialogComponent } from '../Shared/warning-dialog/warning-dialog.component';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'category',
    'quantity',
    'selectedQuantity',
    'availableQuantity',
    'price',
    'actions',
  ];
  dataSource = new MatTableDataSource<ProductModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // @Output() id!: string;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.productService.getProductItems();
    this.productService.productItemChanged.subscribe((item) => {
      this.dataSource.data = item;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
    });
  }

  onEditItem(row: ProductModel) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row,
    });
  }
  onDeleteItem(id: string) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '30%',
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result);
      if (result) {
        this.productService.deleteProductItem(id);
      }
    });
  }
}
