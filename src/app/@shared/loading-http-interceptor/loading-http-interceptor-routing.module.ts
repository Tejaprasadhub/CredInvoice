import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingHttpInterceptorComponent } from './loading-http-interceptor.component';

const routes: Routes = [{ path: '', component: LoadingHttpInterceptorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingHttpInterceptorRoutingModule { }
