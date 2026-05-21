import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../core/services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  imports:[CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  summary: any;
  lowStock: any[] = [];
  expiring: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {

    // SUMMARY
    this.dashboardService.getSummary().subscribe(res => {
      this.summary = res;
    });

    // LOW STOCK
    this.dashboardService.getLowStock().subscribe(res => {
      this.lowStock = res;
    });

    // EXPIRING PRODUCTS
    this.dashboardService.getExpiringProducts().subscribe(res => {
      this.expiring = res;
    });

    // SALES CHART
    this.dashboardService.getSalesReport().subscribe(res => {
      this.renderChart(res);
    });
  }

  renderChart(data: any[]) {

    const labels = data.map(x =>
      new Date(x.date).toLocaleDateString()
    );

    const sales = data.map(x => x.totalSales);

    new Chart('salesChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sales',
            data: sales,
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }
}