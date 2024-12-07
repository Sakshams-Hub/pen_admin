// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrdersPerDay(): Observable<{ labels: string[], values: number[] }> {
    return this.http.get<{ labels: string[], values: number[] }>('http://localhost:3000/orders-per-day');

  }
}
