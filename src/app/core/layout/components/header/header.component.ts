import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartResponse } from 'src/app/models/cart-response';
import { Total } from 'src/app/models/product-list';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartPending: string = '0';
  clearInterval: any;
  constructor(
    private _productService: ProductService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.getProductPending();
    }, 1000);

  }

  getProductPending() {
    this._productService.getTotalCartPending().subscribe({
      next: (result: Total) => {
        if (result.data) {
          this.cartPending = result.data.total;
        }
        this._changeDetectorRef.markForCheck();
      },
      error: (e) => {
      },
    });
  }
}
