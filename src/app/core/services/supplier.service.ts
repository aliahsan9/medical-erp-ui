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

  // =========================
  // API URL
  // =========================

  private apiUrl =
    'https://localhost:7165/api/suppliers';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // GET ALL SUPPLIERS
  // =========================

  getSuppliers(): Observable<Supplier[]> {

    return this.http.get<Supplier[]>(
      this.apiUrl
    );
  }

  // =========================
  // GET SINGLE SUPPLIER
  // =========================

  getSupplierById(
    id: string
  ): Observable<Supplier> {

    return this.http.get<Supplier>(
      `${this.apiUrl}/${id}`
    );
  }

  // =========================
  // CREATE SUPPLIER
  // =========================

  createSupplier(
    data: Supplier
  ): Observable<Supplier> {

    return this.http.post<Supplier>(
      this.apiUrl,
      data
    );
  }

  // =========================
  // UPDATE SUPPLIER
  // =========================

  updateSupplier(
    id: string,
    data: Supplier
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  // =========================
  // DELETE SUPPLIER
  // =========================

  deleteSupplier(
    id: string
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}