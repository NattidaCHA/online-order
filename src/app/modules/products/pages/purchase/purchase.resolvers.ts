import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import {forkJoin, map, Observable} from 'rxjs';
import { CartResponse, Product } from 'src/app/models/cart-response';
import { ProductService } from 'src/app/services/product.service';

export interface ListResolverType {
  cart?: CartResponse;
}

@Injectable({
  providedIn: 'root',
})
export class ListResolver implements Resolve<ListResolverType> {
  constructor(private _productService: ProductService,) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ListResolverType> {
    return forkJoin([
      this._productService.getCartPending(),
    ]).pipe(
      map(value => {
        return {
          cart: value[0],
        } as ListResolverType;
      })
    );
  }
}
