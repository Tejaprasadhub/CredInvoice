import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';
import { RouteDataService } from '../../shared/RouteData.service';

@Component({
  selector: 'app-home-header',
  standalone: false,
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent {
  pageTitle: string = '';

  constructor(private routeDataService: RouteDataService) {}

  ngOnInit(): void {
    this.routeDataService.currentTitle$.subscribe(title => {
      this.pageTitle = title;
    });
  }
  }
