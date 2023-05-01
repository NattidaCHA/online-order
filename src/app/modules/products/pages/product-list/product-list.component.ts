import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ProductDetail,
  ProductLitsResponse,
  Total,
} from 'src/app/models/product-list';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  page: number = 1;
  size: number = 32;
  noData: boolean = true;
  total: string = '0';
  noneProduct: boolean = false;

  products: ProductDetail[] = [];

  constructor(
    private _productService: ProductService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProduct();

    this._productService.getTotalProduct().subscribe({
      next: (result: Total) => {
        if (result.data) {
          this.total = result.data.total;
          this._changeDetectorRef.markForCheck();
        }
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  getProduct() {
    this._productService.getProduct(this.page, this.size).subscribe({
      next: (result: ProductLitsResponse) => {
        if (result.data && result.data.itemList) {
          this.noData = false;
          this.products = result.data.itemList;
        } else {
          this.noData = true;
        }
        this._changeDetectorRef.markForCheck();
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }

  back() {
    this.page = this.page - 1;
    this.getProduct();
  }

  next() {
    this.page = this.page + 1;
    this.getProduct();
  }
}
