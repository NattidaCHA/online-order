import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Cart, CartResponse, Product } from 'src/app/models/cart-response';
import { ProductRequest } from 'src/app/models/product-request';
import { ProductService } from 'src/app/services/product.service';

// export interface Item {
//   Title: string;
//   Description: string;
// }

// export interface Record {
//   ID: number | null;
//   Items: Item[] | null;
// }

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  formGroup!: FormGroup;
  data = [5, 1, 2];
  cartId!: string;
  cart!: Product[];
  productDel: number = 0;
  productIdDel: any = [];

  private _unsubscribeAll = new Subject();
  constructor(
    private fb: FormBuilder,
    private _cookieService: CookieService,
    private _productService: ProductService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toastrService: ToastrService,
    @Inject(DOCUMENT) private _document: Document,
    private _renderer2: Renderer2,
    private _router: Router
  ) {
    this.cartId = this._cookieService.get('_id') ?? '';
  }

  ngOnInit() {
    this._productService.cartPending$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        if (value!.data && value!.data.cart && value!.data.cart.length > 0) {
          this.cart = value!.data.cart;
          this.createForm();
        }
        this._changeDetectorRef.markForCheck();
      });
  }

  createForm() {
    this.formGroup = this.fb.group({
      products: this.fb.array([]),
    });
    this.setOrderItemArray();
  }

  get products() {
    return this.formGroup?.get('products') as FormArray;
  }

  setOrderItemArray() {
    this.cart?.forEach((item) => {
      this.products.push(this.buildOrderItemsForm(item));
    });
  }

  buildOrderItemsForm(item: any): FormGroup {
    return this.fb.group({
      _id: [item._id, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  getProductPending() {
    this._productService.getCartPending().subscribe({
      next: (result: CartResponse) => {
        if (result.data) {
          this.cart = result.data.cart;
        }
        this._changeDetectorRef.markForCheck();
      },
      error: (e) => {
        this._toastrService.error('Cart not found', 'Error');
      },
    });
  }

  deleteProduct(productId: string) {
    this._productService.deleteCart(this.cartId, productId).subscribe({
      next: (res: CartResponse) => {
        this.productIdDel.push(productId);
        this._document
          .getElementById('cart-' + productId)
          ?.classList.add('d-none');
        this._document
          .getElementById('cart-' + productId)
          ?.classList.remove('d-flex');

        this.productDel++;

        if (this.productDel == this.cart!.length && this.cart) {
          this._document.getElementById('productList')?.classList.add('d-none');
          this._document
            .getElementById('productList')
            ?.classList.remove('d-flex');

          this._document.getElementById('noData')?.classList.add('d-blok');
          this._document.getElementById('noData')?.classList.remove('d-none');
        }
      },
      error: (err) => {
        this._toastrService.error('Can not delete product', 'Error');
      },
    });
  }
  submit() {
    let checkValidate = false;
    let productSuccess: ProductRequest[] = [];
    this.formGroup.value.products.map((o: any) => {
      if (this.productIdDel.length > 0 && !this.productIdDel.includes(o._id)) {
        if (!o.amount) {
          checkValidate = true;
        }
      }

      if (this.productIdDel.length < 1) {
        if (!o.amount) {
          checkValidate = true;
        }
      }

      if (o.amount > 0) {
        productSuccess.push(o);
      }
    });

    if (!checkValidate) {
      this._productService.updateCart(this.cartId, productSuccess).subscribe({
        next: () => {
          checkValidate = false;
          this._cookieService.remove('_id');
          window.location.href = 'http://localhost:4200/history';
          // this._router.navigateByUrl('/history')
        },
        error: (err) => {
          this._toastrService.error('Can not update cart', 'Error');
        },
      });
    } else {
      this._toastrService.error('Amount minimum 1', 'Error');
    }
  }
}
