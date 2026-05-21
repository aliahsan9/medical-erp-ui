import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = 'https://localhost:7165/api/invoices';

  constructor(private http: HttpClient) {}

  downloadInvoicePdf(saleId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${saleId}/pdf`, {
      responseType: 'blob'
    });
  }
}