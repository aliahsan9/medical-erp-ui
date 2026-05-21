import { Component, OnInit } from '@angular/core';
import { SaleDto, SalesService } from '../../../core/services/sales.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-list',
  imports:[RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  sales: SaleDto[] = [];
  loading = false;

  constructor(private salesService: SalesService) {}

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
}