import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

getUsersCount(): Observable<number> {
  return this.http.get<{ userCount: number }>('http://localhost:3000/users/count')
    .pipe(
      map(response => response.userCount)
    );
}

getProductsCount(): Observable<number> {
  return this.http.get<{ productCount: number }>('http://localhost:3000/products/count')
    .pipe(
      map(response => response.productCount)
    );
}

getOrdersCount(): Observable<number> {
  return this.http.get<{ orderCount: number }>('http://localhost:3000/orders/count')
    .pipe(
      map(response => response.orderCount)
    );
    }
    
getSalesTotal(): Observable<number> {
  return this.http.get<{ totalSales: string }>('http://localhost:3000/sales/total')
    .pipe(
      tap(response => console.log("Sales Total response:", response)),
      map(response => parseFloat(response.totalSales)),
      catchError(error => {
        console.error("Error fetching total sales:", error);
        throw error; // Rethrow the error to be handled by the subscriber
      })
    );
    }
    
     getRecentOrders() {
    return this.http.get<any[]>(`http://localhost:3000/orders/recent`);
    }
    
        getAllOrders() {
    return this.http.get<any[]>(`http://localhost:3000/orders/all`);
  }






}
