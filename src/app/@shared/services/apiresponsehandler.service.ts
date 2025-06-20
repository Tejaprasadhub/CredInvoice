import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageTokenService } from './session-storage-token.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseHandlerService {

  constructor(private httpClient: HttpClient,
    private messageService: MessageService, private router: Router,
    private route: ActivatedRoute, private token: SessionStorageTokenService
  ) { }

  handleError(e: any) {
    this.messageService.clear();
    if (e.status === 401) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e?.error?.message, sticky: true });
      this.token.removeToken();
      this.router.navigate(['/login'], { replaceUrl: true });
    }
    else if (e.status === 403) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e?.error?.message, sticky: true });
    }
    else if (e.status === 500) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e?.error?.message, sticky: true });
    }
    else if (e.status === 422) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e?.error?.message, sticky: true });
    }
    else if (e.status === 400) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e?.error?.message, sticky: true });
    }
    else if (e.status === 404) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e?.error?.message, sticky: true });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e?.error?.message, sticky: true });
    }

    setTimeout(() => {
      this.messageService.clear()
    }, 10000);
    return throwError(() => new Error(e?.error?.message || 'Something went wrong.'));
    return of({});
  }
  handleSuccess(message: string) {
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, sticky: true });
    setTimeout(() => {
      this.messageService.clear()
    }, 10000);
  }

}