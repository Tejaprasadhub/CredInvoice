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

  getDocumentTypes(companyTypeId: string) {
    let url = "kyc/company-types/"+companyTypeId;
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

  getKycSubmissionsId(kycId: string) {
    let url = "kyc/submissions/"+kycId;
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }
   getKycSubmissions() {
    let url = "kyc/submissions";
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

   createKyc(requestData: any) {
    return this.httpClient.post("kyc/submissions", requestData).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

   uploadKycDocument(file: File,registerData: any,kycId:string) {
     const formData: FormData = new FormData();
        formData.append('file', file, file?.name);
        formData.append('file_name', file?.name);
        formData.append('document_type_id', registerData?.documentType?.value );
        formData.append('mime_type', "application/pdf");      
    return this.httpClient.post("kyc/submissions/"+kycId+"/documents", formData).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

  
  deleteKycDocument(kycId: string,documentId:string) {
    let url = "kyc/submissions/"+kycId+"/documents/"+documentId;
    return this.httpClient.delete(url).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

  updateKycDetails(kycId: string,name:string,requestData: any) {
    let url = "kyc/submissions/"+kycId+"/"+name;
    return this.httpClient.put(url,requestData).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

   kycSubmitReview(kycId: string) {
    let url = "kyc/submissions/"+kycId+"/submit";
    return this.httpClient.post(url,null).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }
}