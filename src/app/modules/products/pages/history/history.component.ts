import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { Cart, CartLitsResponse, Product } from 'src/app/models/cart-response';
import { Total } from 'src/app/models/product-list';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  page: number = 1;
  size: number = 32;
  noData: boolean = true;
  noneProduct: boolean = false;
  openLog: boolean = false;
  closeLog: boolean = true;
  cartHistory: Cart[] = [];
  total:number = 0

  constructor(
    private _productService: ProductService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toastrService: ToastrService,
    private _router: Router,
    private _cookieService: CookieService,
    @Inject(DOCUMENT) private _document: Document,
    private _renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.getCartHistory();
    //getTotalCartSuccess
  }


  getTotalCartSuccess() {
    this._productService.getTotalCartPending().subscribe({
      next: (result: Total) => {
        if (result.data) {
          this.total = parseInt(result.data.total);
        }
        this._changeDetectorRef.markForCheck();
      },
      error: (e) => {
      },
    });
  }


  getCartHistory() {
    this._productService.getCartHistory(this.page, this.size).subscribe({
      next: (result: CartLitsResponse) => {
        if (result.data && result.data.itemList) {
          this.noData = false;
          this.cartHistory = result.data.itemList;
        } else {
          this.noData = true;
        }
        this._changeDetectorRef.markForCheck();
      },
      error: (e) => {
        this._toastrService.error('Cart not found', 'Error');
      },
    });
  }

  back() {
    this.page = this.page - 1;
    this.getCartHistory();
  }

  next() {
    this.page = this.page + 1;
    this.getCartHistory();
  }

  open(index: number) {
    this._document.getElementById('detail'+index)?.classList.add('d-block')
    this._document.getElementById('detail'+index)?.classList.remove('d-none')
    this._document.getElementById('open'+index)?.classList.add('d-none')
    this._document.getElementById('open'+index)?.classList.remove('d-block')
    this._document.getElementById('close'+index)?.classList.add('d-block')
    this._document.getElementById('close'+index)?.classList.remove('d-none')
  }

  close(index: number) {
    this._document.getElementById('detail'+index)?.classList.add('d-none')
    this._document.getElementById('detail'+index)?.classList.remove('d-block')
    this._document.getElementById('close'+index)?.classList.add('d-none')
    this._document.getElementById('close'+index)?.classList.remove('d-block')
    this._document.getElementById('open'+index)?.classList.add('d-block')
    this._document.getElementById('open'+index)?.classList.remove('d-none')
  }
}
