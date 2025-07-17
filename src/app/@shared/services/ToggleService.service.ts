// toggle.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToggleService {
  private showMenuSubject = new BehaviorSubject<boolean>(true);
  showMenu$ = this.showMenuSubject.asObservable();

  toggleMenu() {
    this.showMenuSubject.next(!this.showMenuSubject.value);
  }
}
