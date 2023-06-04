import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import {
  ProductDetail,
  ProductLitsResponse,
  Total,
} from 'src/app/models/product-list';
import { ProductRequest } from 'src/app/models/product-request';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

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

  products: ProductDetail[] = [];
  productRequest!:ProductRequest

  constructor(
    private _productService: ProductService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toastrService: ToastrService,
    private _router:Router,
    private _cookieService: CookieService
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

  addProduct(id:string) {
    this.productRequest ={
      _id:id
    }
    this._productService.createCart(this.productRequest).subscribe({
      next: (res) => {
        this._cookieService.put('_id', res.data._id);
        this._toastrService.success(
          'Add product success',
          'Success'
        );
      },
      error: err => {
        this._toastrService.error(
          'Can not add product',
          'Error'
        );
      },
    });
  }
}
