import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateSaleItemRequest {
  productId: string;
  quantity: number;
}

export interface CreateSaleRequest {
  customerName?: string;
  items: CreateSaleItemRequest[];
}

export interface SaleItemDto {
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SaleDto {
  id: string;
  customerName: string;
  invoiceNumber: string;
  totalAmount: number;
  createdAt: string;
  items: SaleItemDto[];
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private baseUrl = 'https://localhost:7165/api/sales';

  constructor(private http: HttpClient) {}

  createSale(data: CreateSaleRequest): Observable<SaleDto> {
    return this.http.post<SaleDto>(this.baseUrl, data);
  }

  getAllSales(): Observable<SaleDto[]> {
    return this.http.get<SaleDto[]>(this.baseUrl);
  }

  getSaleById(id: string): Observable<SaleDto> {
    return this.http.get<SaleDto>(`${this.baseUrl}/${id}`);
  }
}