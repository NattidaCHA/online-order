import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ProductDetail,
  ProductLitsResponse,
} from 'src/app/models/product-list';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  page: number = 1;
  size: number = 20;
  noData: boolean = false;

  products!: ProductDetail[];

  constructor(
    private _productService: ProductService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this._productService.geProduct(this.page, this.size).subscribe({
      next: (result: ProductLitsResponse) => {
        if (result.data) {
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
