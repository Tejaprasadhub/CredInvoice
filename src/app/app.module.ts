import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeShellModule } from './home-shell/home-shell.module';
import { ApiPrefixInterceptor, ErrorHandlerInterceptor, SharedModule } from './@shared';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingHttpInterceptorComponent, LoadingHttpInterceptorFactoryProvider } from './@shared/loading-http-interceptor/loading-http-interceptor.component';
import { KycShellModule } from './kyc-shell/kyc-shell.module';

const LoadingHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: LoadingHttpInterceptorComponent,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeShellModule,
    KycShellModule,
    HttpClientModule,
    SharedModule,
    ToastModule,
    AppRoutingModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    LoadingHttpInterceptorProvider,
    LoadingHttpInterceptorFactoryProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
