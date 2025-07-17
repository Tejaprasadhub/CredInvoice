import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SessionStorageTokenService } from '../../@shared/services/session-storage-token.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToggleService } from '../../@shared/services/ToggleService.service';
import { RouteDataService } from '../../shared/RouteData.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-sidemenu',
  standalone: false,
  templateUrl: './home-sidemenu.component.html',
  styleUrl: './home-sidemenu.component.scss'
})
export class HomeSidemenuComponent {
  menuItems: MenuItem[] = [];
  userRole : string="";
constructor(private sessionStorageService:SessionStorageTokenService,
  private toggleService: ToggleService,private routeDataService: RouteDataService
) { 
  this.userRole = this.sessionStorageService.getUserRole() || '';
  if(this.userRole) {
  this.userRole = this.userRole.toLowerCase();
  }
}
  ngOnInit() {
    this.menuItems = [
      { label: 'Dashboard', icon: 'pi pi-th-large', routerLink: ['/home/dashboard'], styleClass: 'active-item', url:'assets/icons/dashboard_black.png' },
      { label: 'Invoices', icon: 'pi pi-file', routerLink: [this.userRole == "seller" ?  '/home/seller-invoices' : '/home/invoices'] ,url:'assets/icons/Receipt.png'},
      { label: 'Reports', icon: 'pi pi-chart-bar', routerLink: ['/home/reports'],url:'assets/icons/ChartBar.png' },
      { label: 'My Vendors', icon: 'pi pi-users', routerLink: ['/home/vendors'],url:'assets/icons/vendors.png' },
      { label: 'Negotiate', icon: 'pi pi-comments', routerLink: ['/home/negotiate'],url:'assets/icons/Handshake.png' },
      { label: 'Bidding Management', icon: 'pi pi-gavel', routerLink: ['/home/bidding'],url:'assets/icons/Scales.png' }
    ];

   
  }

  SignOut(){
    this.sessionStorageService.removeToken();
    window.location.href = '/login'; // Redirect to login page
  }
}
