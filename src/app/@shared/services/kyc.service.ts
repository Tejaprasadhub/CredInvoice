import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponseHandlerService } from "./apiresponsehandler.service";
import { catchError, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KycService {
    constructor(private httpClient: HttpClient,
    private apiResponseHandler:ApiResponseHandlerService
  ) { }
  
  getCompanyTypes() {
    let url = "kyc/company-types";
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }
}