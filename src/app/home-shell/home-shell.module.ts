import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeShellRoutingModule } from './home-shell-routing.module';
import { HomeShellComponent } from './home-shell.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { PrimengModule } from '../primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeSidemenuComponent } from './home-sidemenu/home-sidemenu.component';


@NgModule({
  declarations: [
    HomeShellComponent,
    HomeHeaderComponent,
    HomeSidemenuComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    BrowserAnimationsModule,
    HomeShellRoutingModule
  ],
  exports:[
    HomeHeaderComponent
  ]
})
export class HomeShellModule { }
