import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum InventoryTransactionType {
  StockIn = 0,
  StockOut = 1
}

export interface CreateInventoryTransactionRequest {
  productId: string;
  type: InventoryTransactionType;
  quantity: number;
  notes?: string;
}

export interface InventoryTransactionDto {
  id: string;
  productId: string;
  productName: string;
  type: InventoryTransactionType;
  quantity: number;
  notes?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = 'https://localhost:7165/api/inventory';

  constructor(private http: HttpClient) {}

  createTransaction(data: CreateInventoryTransactionRequest): Observable<InventoryTransactionDto> {
    return this.http.post<InventoryTransactionDto>(`${this.baseUrl}/transaction`, data);
  }

  getAllTransactions(): Observable<InventoryTransactionDto[]> {
    return this.http.get<InventoryTransactionDto[]>(`${this.baseUrl}/transactions`);
  }
}