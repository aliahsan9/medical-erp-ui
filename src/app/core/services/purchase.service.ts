import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PurchaseItem {
  productId: string;
  quantity: number;
  unitCostPrice: number;
}

export interface CreatePurchaseRequest {
  supplierId: string;
  items: PurchaseItem[];
}

export interface PurchaseDto {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  totalAmount: number;
  createdAt: string;
  items: PurchaseItemDto[];
}

export interface PurchaseItemDto {
  productName: string;
  quantity: number;
  unitCostPrice: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private apiUrl = 'https://localhost:7165/api/purchases';

  constructor(private http: HttpClient) {}

  createPurchase(
    request: CreatePurchaseRequest
  ): Observable<PurchaseDto> {

    return this.http.post<PurchaseDto>(
      this.apiUrl,
      request
    );
  }

  getAllPurchases(): Observable<PurchaseDto[]> {

    return this.http.get<PurchaseDto[]>(
      this.apiUrl
    );
  }

  getPurchaseById(id: string): Observable<PurchaseDto> {

    return this.http.get<PurchaseDto>(
      `${this.apiUrl}/${id}`
    );
  }
}