import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { ActualTargetData } from 'src/app/models/actual-target';
import { GrowthData } from 'src/app/models/growth';
import { ProductService } from 'src/app/services/product.service';

export interface ListResolverType {
  actual?: ActualTargetData[];
  growth?: GrowthData[];
}

@Injectable({
  providedIn: 'root',
})
export class ReportResolver implements Resolve<ListResolverType> {
  constructor(private _productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ListResolverType> {
    return forkJoin([
      this._productService.getActualTarget(),
      this._productService.getGrowth(),
    ]).pipe(
      map((value) => {
        return {
          actuals: value[0],
          growths: value[1],
        } as ListResolverType;
      })
    );
  }
}
