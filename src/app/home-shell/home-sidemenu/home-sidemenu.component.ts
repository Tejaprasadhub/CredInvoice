import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home-sidemenu',
  standalone: false,
  templateUrl: './home-sidemenu.component.html',
  styleUrl: './home-sidemenu.component.scss'
})
export class HomeSidemenuComponent {
  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      { label: 'Dashboard', icon: 'pi pi-th-large', routerLink: ['/home/dashboard'], styleClass: 'active-item', url:'assets/icons/dashboard.png' },
      { label: 'Invoices', icon: 'pi pi-file', routerLink: ['/home/invoices'] ,url:'assets/icons/Receipt.png'},
      { label: 'Reports', icon: 'pi pi-chart-bar', routerLink: ['/home/reports'],url:'assets/icons/ChartBar.png' },
      { label: 'My Vendors', icon: 'pi pi-users', routerLink: ['/home/vendors'],url:'assets/icons/vendors.png' },
      { label: 'Negotiate', icon: 'pi pi-comments', routerLink: ['/home/negotiate'],url:'assets/icons/Handshake.png' },
      { label: 'Bidding Management', icon: 'pi pi-gavel', routerLink: ['/home/bidding'],url:'assets/icons/Scales.png' }
    ];
  }
}
