import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiResponseHandlerService } from './apiresponsehandler.service';
import { SessionStorageTokenService } from './session-storage-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private tokenProvider: SessionStorageTokenService,
    private apiResponseHandler:ApiResponseHandlerService
  ) { }

  login(loginUserData: any) {
    let data = JSON.stringify({
        email: loginUserData.email,
        password: loginUserData.password
    });
    return this.httpClient.post("auth/login", data).pipe(
      map((response: any) => {
        if (response.status) {
          this.tokenProvider.setToken({ token: response?.data?.access_token });
        }        
         this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

  register(registerData: any,userType:string="BUYER") {
    let data = JSON.stringify({
      user_type: userType,
      first_name: registerData.lastname,
      last_name: registerData.lastname,
      email: registerData.email,
      password: registerData.password,
      pan_number: registerData.pan,
      company_name: registerData.company
    });
    return this.httpClient.post("auth/signup", data).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  } 
  
  validateOTP(formData: any) {
    let data = JSON.stringify({
      email: localStorage.getItem("userEmail"),
      otp: formData.otp,
    });
    return this.httpClient.post("auth/verify-otp", data).pipe(
      map((response: any) => {
        this.apiResponseHandler.handleSuccess(response?.message);
        return response;
      }), catchError(e => this.apiResponseHandler.handleError(e)));
  }

}