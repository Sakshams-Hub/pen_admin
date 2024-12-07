import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getOrdersPerDay(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orders-per-day`);
  }

  getSalesPerDay(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sales`);
  }

    getOrdersPerMonth(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orders-per-month`);
  }

  getSalesPerMonth(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sales-per-month`);
  }
}
