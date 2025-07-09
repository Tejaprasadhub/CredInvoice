import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { RouteDataService } from '../../shared/RouteData.service';
import { ToggleService } from '../../@shared/services/ToggleService.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home-header',
  standalone: false,
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent {
  pageTitle: string = '';
  private sub!: Subscription;
  showMenu:boolean = true;


  constructor(private routeDataService: RouteDataService,private toggleService: ToggleService) {}

  ngOnInit(): void {
    this.routeDataService.currentTitle$.subscribe(title => {
      this.pageTitle = title;
    });

    this.sub = this.toggleService.showMenu$.subscribe(
      visible =>{
        if (visible) {
          this.showMenu = true;
        } else {
          this.showMenu = false;
        }
      } 
    );
  }


  toggleSideMenu() {
    this.toggleService.toggleMenu();
  }
  }
