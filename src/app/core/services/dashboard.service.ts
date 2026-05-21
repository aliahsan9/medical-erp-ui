import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardSummaryDto {
  todaySales: number;
  monthlySales: number;
  totalPurchases: number;
  totalProducts: number;
  lowStockProducts: number;
  expiringProducts: number;
}

export interface SalesReportDto {
  date: string;
  totalSales: number;
  totalInvoices: number;
}

export interface LowStockDto {
  productId: string;
  productName: string;
  quantity: number;
}

export interface ExpiringProductDto {
  productId: string;
  productName: string;
  expiryDate: string;
  daysRemaining: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'https://localhost:7165/api/dashboard';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<DashboardSummaryDto> {
    return this.http.get<DashboardSummaryDto>(`${this.baseUrl}/summary`);
  }

  getSalesReport(): Observable<SalesReportDto[]> {
    return this.http.get<SalesReportDto[]>(`${this.baseUrl}/sales-report`);
  }

  getLowStock(): Observable<LowStockDto[]> {
    return this.http.get<LowStockDto[]>(`${this.baseUrl}/low-stock`);
  }

  getExpiringProducts(): Observable<ExpiringProductDto[]> {
    return this.http.get<ExpiringProductDto[]>(`${this.baseUrl}/expiring-products`);
  }
}