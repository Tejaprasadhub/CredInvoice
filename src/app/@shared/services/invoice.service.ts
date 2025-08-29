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
    const isSeller = sessionStorage.getItem("role")?.toLowerCase()  === 'seller';
    let url = "";
    if (isSeller) {
      url = "seller-invoices";
    }else{
      url = "invoices";
    }
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }
  getInvoiceDetails(id: string) {   
    const isSeller = sessionStorage.getItem("role")?.toLowerCase()  === 'seller';
    let url = "";
    if (isSeller) {
      url = "seller-invoices";
    }else{
      url = "invoices";
    }
    return this.httpClient.get(url+"/"+id).pipe(
      map((response: any) => {
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

   createInovice(file: File,registerData: any,itemsList:any[]=[]) {
     const formData: FormData = new FormData();
        formData.append('invoice_number', registerData?.number);
        formData.append('file', file, file?.name);
        formData.append('invoice_amount', registerData?.amount)
        formData.append('invoice_date', registerData?.invoiceDate?.toISOString());
        formData.append('invoice_due_date', registerData?.disbursementDate?.toISOString());
        formData.append('fund_by', registerData?.fundBy?.value );
        formData.append('goods_description', registerData?.description );
        formData.append('seller_id', registerData?.invoiceseller?.value );
       formData.append('items', JSON.stringify(itemsList) );
    return this.httpClient.post("invoices", formData).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  } 

  updateInovice(file: File,registerData: any,itemsList:any[]=[],invoiceId:string="") {
      itemsList = itemsList.map(({ created_at, ...rest }) => rest);
     const formData: FormData = new FormData();
        formData.append('invoice_number', registerData?.number);
        if(file?.name){
        formData.append('file', file, file?.name ? file?.name : registerData?.number+'_invoice'); // Handle case where file might be undefined
        }
        formData.append('invoice_amount', registerData?.amount);
        formData.append('invoice_date', registerData?.invoiceDate?.toISOString());
        formData.append('invoice_due_date', registerData?.disbursementDate?.toISOString());
        formData.append('fund_by', registerData?.fundBy?.value );
        formData.append('goods_description', registerData?.description );
        formData.append('seller_id', registerData?.invoiceseller?.value );
       formData.append('items', JSON.stringify(itemsList) );
    return this.httpClient.put("invoices/"+invoiceId, formData).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }


  applyDiscountOnInvoices(requestData: any, selectedInvoices: any[]) {
    let data = JSON.stringify({
      discount_percentage: requestData.discount,
      disbursement_date: requestData.disbursementDate?.toISOString(),
      invoice_ids: selectedInvoices,
      fund_by:"FINANCIER"
    });
    return this.httpClient.post("invoices/apply-discount", data).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

  applyDiscountOnInvoice(requestData: any, selectedInvoices: any[]) {
    let data = JSON.stringify({
      discount_percentage: requestData.totaldiscount,
      disbursement_date: requestData.total_disbursement_date?.toISOString(),
      invoice_ids: selectedInvoices,
      fund_by:requestData.totalfundBy?.value
    });
    return this.httpClient.post("invoices/apply-discount", data).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }
authorizationInvoice(requestData: any, invoiceId: any[]) {
    let data = JSON.stringify({
     "invoice_id": invoiceId,
     "fund_by": requestData
    });
    return this.httpClient.post("invoices/authorize-payment", data).pipe(
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


  acceptWithDiscount(invoiceId:string) {
    let data = JSON.stringify({
      invoice_id: invoiceId,
      action: "accept",
      message: "Invoice accepted. Will process payment as per terms."
    });
    return this.httpClient.post("seller-invoices/action", data).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess("Invoice accepted");
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

  rejectWithReasoning(invoiceId:string,reasonMessage:string) {
    let data = JSON.stringify({
      invoice_id: invoiceId,
      action: "reject",
      message: reasonMessage
    });
    return this.httpClient.post("seller-invoices/action", data).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess("Invoice rejected");
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }


  

}