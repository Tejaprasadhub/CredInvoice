import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionStorageTokenService } from '../services/session-storage-token.service';
import { environment } from '../../../environments/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(public TokenProvider: SessionStorageTokenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.indexOf('amazonaws.com') > -1)
        return next.handle(request);

    let headers: any = request.headers;

  
    if (this.TokenProvider.getToken() != null) {
      headers = request.headers.set('Authorization', `Bearer ${this.TokenProvider.getToken()}`)
    }

    if (!/^(http|https):/i.test(request.url))
      request = request.clone({ url: environment.serverUrl + request.url, headers: headers });
    else
      request = request.clone({ headers: headers });
    return next.handle(request);
  }
}
