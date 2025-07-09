import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToggleService } from '../@shared/services/ToggleService.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home-shell',
  standalone: false,
  templateUrl: './home-shell.component.html',
  styleUrl: './home-shell.component.scss',
  animations: [
    trigger('growShrink', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ]),
  ]
})
export class HomeShellComponent implements OnInit, OnDestroy {
  showMenu:boolean = true;
  private sub!: Subscription;
 menuState: 'in' | 'out' = 'in';
  constructor(private toggleService: ToggleService) {}

  ngOnInit() {
    this.sub = this.toggleService.showMenu$.subscribe(
      visible =>{
        if (visible) {
          this.showMenu = true;
          this.menuState = 'in';
        } else {
          this.showMenu = false;
          this.menuState = 'out'; 
        }
      } 
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

