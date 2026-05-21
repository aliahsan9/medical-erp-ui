import { Routes } from '@angular/router';
import { HomeComponent } from './features/dashboard/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { StockComponent } from './features/inventory/stock/stock.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { SalesCreateComponent } from './features/sales/sales-create/sales-create.component';
import { SalesListComponent } from './features/sales/sales-list/sales-list.component';
import { SupplierComponent } from './features/supplier/supplier.component';
import { PurchaseComponent } from './features/purchase/purchase.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'stock', component: StockComponent},
    {path: 'supplier', component: SupplierComponent},
    {path: 'purchase', component: PurchaseComponent},
    {path: 'product-form', component: ProductFormComponent},
    {path: 'product-list', component: ProductListComponent},
    {path: 'sales-list', component: SalesCreateComponent},
    {path: 'sales-list', component: SalesListComponent},
];
