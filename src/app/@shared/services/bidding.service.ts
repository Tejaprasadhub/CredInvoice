import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ApiResponseHandlerService } from "./apiresponsehandler.service";
import { catchError, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BiddingService {
 private baseUrl = environment.serverUrl;

  constructor(private httpClient: HttpClient,
    private apiResponseHandler:ApiResponseHandlerService
  ) { }

  getBiddingList(selectedSellers:any[]=[],selectedBuyers:any[]=[]) {
      let url = "financier/bidding";

      if(selectedSellers.length > 0 || selectedBuyers.length > 0) {
        const sellerIds = selectedSellers.join(',');
        const buyerIds = selectedBuyers.join(',');
        const queryParams = [];
        if (sellerIds) {
          queryParams.push(`seller_ids=${sellerIds}`);
        }
        if (buyerIds) {
          queryParams.push(`buyer_ids=${buyerIds}`);
        }
        url += `?${queryParams.join('&')}`;
      }
      return this.httpClient.get(url).pipe(
        map((response: any) => {
          return response;
        }), catchError(e => this.apiResponseHandler.handleError(e)));
    }

    PostBids(bidData: any) {
        let data = JSON.stringify({
      bids: bidData
    });
      let url = "financier/bidding/place-bid";
      return this.httpClient.post(url,data).pipe(
        map((response: any) => {
          this.apiResponseHandler.handleSuccess(response?.message);
          return response;
        }), catchError(e => this.apiResponseHandler.handleError(e)));
    }
}