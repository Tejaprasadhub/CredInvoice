import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeShell } from './home-shell/home-shell.service';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  
  HomeShell.childRoutes([
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
   ]),
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
