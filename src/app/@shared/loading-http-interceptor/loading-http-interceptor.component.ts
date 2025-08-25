import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError as observableThrowError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';



@Injectable()
export class LoadingHttpInterceptorComponent implements HttpInterceptor {
  private requests = 0;
  public anyRequestsLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  constructor() { }
  get LoadingRequestsStatus(): Observable<boolean> {
    return this.anyRequestsLoading.asObservable();
  }
  get loadingRequests(): number {
    return this.requests;
  }

  showSpinner() {
    this.anyRequestsLoading.next(true);
  }

  hideSpinner() {
    this.anyRequestsLoading.next(false);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('background=true') > 0 || (req.urlWithParams && req.urlWithParams.indexOf('background=true') > 0)) {
      return next.handle(req);
    }
    this.requests++;
    if (this.requests == 1) {
      this.showSpinner();
    }
    const params = req.params;
    let headers = null;
      if (req.url.indexOf('post/upload') >= 0 
      || req.url.indexOf('profile/image') >= 0 
      || req.url.indexOf('category/image') >= 0 
      || req.url.indexOf('invoices') >= 0 
      || req.url.indexOf('media') >= 0 
      || req.url.indexOf('amazonaws.com') >= 0) {
      headers = req.headers;
    } else {
      headers = req.headers.set('Content-Type', 'application/json');
    }
    const updatedReq = req.clone({ headers :headers, params : params});
    return next.handle(updatedReq).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        return observableThrowError(error);
      }),
      finalize(() => {
        this.requests--;
        if (this.requests == 0) {
          this.hideSpinner();
        }
      })
    );
  }
}

export function LoadingHttpInterceptorFactory() {
  return new LoadingHttpInterceptorComponent();
}

export let LoadingHttpInterceptorFactoryProvider = {
  provide: LoadingHttpInterceptorComponent,
  useFactory: LoadingHttpInterceptorFactory
}
