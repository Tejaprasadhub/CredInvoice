import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiResponseHandlerService } from './apiresponsehandler.service';
import { SessionStorageTokenService } from './session-storage-token.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = environment.serverUrl;

  constructor(private httpClient: HttpClient,
    private apiResponseHandler:ApiResponseHandlerService
  ) { }
  
  getInvoicesList() {
    return this.httpClient.get("invoices").pipe(
      map((response: any) => {
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

   createInovice(registerData: any,itemsList:any[]) {
    let data = JSON.stringify({
      seller_id: registerData?.invoiceseller?.value,
      invoice_number: registerData.number,
      invoice_amount: registerData.amount,
      invoice_pdf: "",
      invoice_date: registerData.invoiceDate,
      invoice_due_date: registerData.disbursementDate,
      fund_by: registerData?.fundBy?.value,
      goods_description: registerData.description,
      items: itemsList
    });
    console.log("create invoice data",data);
    return this.httpClient.post("invoices", data).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  } 

  applyDiscountOnInvoices(requestData: any, selectedInvoices: any[]) {
    let data = JSON.stringify({
      discount_percentage: requestData.discount,
      disbursement_date: requestData.disbursementDate,
      invoice_ids: selectedInvoices,
      fund_by:"FINANCIER"
    });
    return this.httpClient.post("invoices/apply-discount", data).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

  sendToSeller(invoiceIds: any[]) {
    let data = JSON.stringify({
      invoice_ids: invoiceIds,
      message: "Please review these invoices"
    });
    return this.httpClient.post("invoices/send-to-seller", data).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess("Send to seller successfully");
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }


  

}