import { Component, OnInit } from '@angular/core';
import { SaleDto, SalesService } from '../../core/services/sales.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice',
  imports:[RouterModule, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  sales: SaleDto[] = [];
  loading = false;

  constructor(
    private salesService: SalesService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.loading = true;

    this.salesService.getAllSales().subscribe({
      next: (res) => {
        this.sales = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  downloadInvoice(saleId: string, invoiceNumber: string) {
    this.invoiceService.downloadInvoicePdf(saleId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice-${invoiceNumber}.pdf`;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    });
  }
}