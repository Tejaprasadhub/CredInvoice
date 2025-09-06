import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeShell } from './home-shell/home-shell.service';
import { KycShell } from './kyc-shell/kyc-shell.service';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  
  HomeShell.childRoutes([
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
   ]),

   KycShell.childRoutes([
      { path: 'kyc', loadChildren: () => import('./kyc-shell/kyc-shell.module').then(m => m.KycShellModule) },
   ]),

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
