import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductLitsResponse, Total } from '../models/product-list';
import { environment } from 'src/environments/environment';
import { GrowthData, GrowthResponse } from '../models/growth';
import {
  ActualTargetData,
  ActualTargetResponse,
} from '../models/actual-target';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private _httpClient: HttpClient) {}

  getProduct(
    pageNumber: number,
    pageSize: number = 20
  ): Observable<ProductLitsResponse> {
    return this._httpClient.get<ProductLitsResponse>(
      `${environment.apiUrl}/product`,
      {
        params: { pageno: pageNumber, pagesize: pageSize },
      }
    );
  }

  getActualTarget(): Observable<ActualTargetResponse> {
    return this._httpClient.get<ActualTargetResponse>(
      `${environment.apiUrl}/actual_target`
    );
  }

  getGrowth(): Observable<GrowthResponse> {
    return this._httpClient.get<GrowthResponse>(
      `${environment.apiUrl}/growth_year`
    );
  }

  getTotalProduct(): Observable<Total> {
    return this._httpClient.get<Total>(
      `${environment.apiUrl}/total_product`
    );
  }
}
