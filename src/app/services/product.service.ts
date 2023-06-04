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
import { ProductRequest } from '../models/product-request';
import { CartLitsResponse, CartResponse, Product } from '../models/cart-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _httpClient: HttpClient) {}

  private _id$: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  get id$(): Observable<string | null> {
    return this._id$.asObservable();
  }

  private _cartPending$: BehaviorSubject<CartResponse | null> =
  new BehaviorSubject<CartResponse | null>(null);

get cartPending$(): Observable<CartResponse | null> {
  return this._cartPending$.asObservable();
}

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
    return this._httpClient.get<Total>(`${environment.apiUrl}/total_product`);
  }

  createCart(productRequest: ProductRequest): Observable<CartResponse> {
    return this._httpClient.post<CartResponse>(
      `${environment.apiUrl}/create/cart`,
      productRequest
    );
  }
  deleteCart(cartId: string, productId: string): Observable<CartResponse> {
    return this._httpClient.delete<CartResponse>(
      `${environment.apiUrl}/cart/${cartId}/product/${productId}`
    );
  }

  updateCart(
    cartId: string,
    productRequest: ProductRequest[]
  ): Observable<CartResponse> {
    return this._httpClient.put<CartResponse>(
      `${environment.apiUrl}/update/cart/${cartId}`,
      productRequest
    );
  }

  getCartHistory(
    pageNumber: number,
    pageSize: number = 10
  ): Observable<CartLitsResponse> {
    return this._httpClient.get<CartLitsResponse>(
      `${environment.apiUrl}/cart/history`,
      {
        params: { pageno: pageNumber, pagesize: pageSize },
      }
    );
  }

  getCartPending(): Observable<CartResponse> {
    return this._httpClient.get<CartResponse>(
      `${environment.apiUrl}/cart/pending`
    ).pipe(
      tap(response => {
        this._cartPending$.next(response);
      })
    );;
  }

  
  getTotalCartPending(): Observable<Total> {
    return this._httpClient.get<Total>(`${environment.apiUrl}/total_cart/pending`);
  }

    
  getTotalCartSuccess(): Observable<Total> {
    return this._httpClient.get<Total>(`${environment.apiUrl}/total_cart/success`);
  }
}
