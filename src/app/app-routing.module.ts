import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';


const routes: Routes = [
  { path: "addProducts", component: AddproductsComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "viewProducts", component: ProductsListComponent },
  { path: "productDetails/:id", component: ProductDetailsComponent }, 
  { path: "allOrders", component: AllOrdersComponent },
  { path: "analytics", component: AnalyticsComponent },
  { path: "admin_login", component: AdminLoginComponent },
  { path: "admin_register", component: AdminRegisterComponent },  
  { path: '', redirectTo: '/admin_login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
