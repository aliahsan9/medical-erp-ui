import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  sidebarOpen = false;

  user: any;

  navLinks = [
    {
      label: 'Dashboard',
      icon: 'bi bi-grid-1x2-fill',
      route: '/'
    },
    {
      label: 'Products',
      icon: 'bi bi-capsule-pill',
      route: '/product-list'
    },
    {
      label: 'Supplier',
      icon: 'bi bi-cash-stack',
      route: '/supplier'
    },
    {
      label: 'Sales',
      icon: 'bi bi-cash-stack',
      route: '/sale-list'
    },
    {
      label: 'Inventory',
      icon: 'bi bi-box-seam',
      route: '/stock'
    },
    {
      label: 'Invoices',
      icon: 'bi bi-receipt-cutoff',
      route: '/invoices'
    },
    {
      label: 'Reports',
      icon: 'bi bi-bar-chart-fill',
      route: '/reports'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getUser();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;

    if (this.sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeSidebar() {
    this.sidebarOpen = false;
    document.body.style.overflow = 'auto';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 992) {
      this.sidebarOpen = false;
      document.body.style.overflow = 'auto';
    }
  }
}