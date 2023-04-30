import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductLitsResponse } from '../models/product-list';
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
  private _actuals$: BehaviorSubject<ActualTargetResponse | null> =
    new BehaviorSubject<ActualTargetResponse | null>(null);

  private _growths$: BehaviorSubject<GrowthResponse | null> =
    new BehaviorSubject<GrowthResponse | null>(null);

  constructor(private _httpClient: HttpClient) {}

  get actuals$(): Observable<ActualTargetResponse | null> {
    return this._actuals$.asObservable();
  }

  get growths$(): Observable<GrowthResponse | null> {
    return this._growths$.asObservable();
  }

  geProduct(
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
    return this._httpClient
      .get<ActualTargetResponse>(`${environment.apiUrl}/actual_target`)
      .pipe(
        tap((response) => {
          this._actuals$.next(response);
        })
      );
    // return this._httpClient.get<ActualTargetResponse>(
    //   `${environment.apiUrl}/actual_target`
    // );
  }

  getGrowth(): Observable<GrowthResponse> {
    // return this._httpClient.get<GrowthResponse>(
    //   `${environment.apiUrl}/growth_year`
    // );
    return this._httpClient
      .get<GrowthResponse>(`${environment.apiUrl}/growth_year`)
      .pipe(
        tap((response) => {
          this._growths$.next(response);
        })
      );
  }
}
