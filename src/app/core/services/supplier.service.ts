import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Supplier {
  id?: string;
  name: string;
  phoneNumber?: string;
  address?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = 'https://localhost:7165/api/suppliers';
  // change port according to your backend

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  createSupplier(data: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, data);
  }
}