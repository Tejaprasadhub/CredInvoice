import { Injectable } from '@angular/core';
export interface TokenProvider {
  getToken(): string;
  removeToken(): void;
  setToken(token: any): void;
  getUsername(): string;
}
@Injectable({
  providedIn: 'root'
})
export class SessionStorageTokenService implements TokenProvider {

  getToken(): any {
    return JSON.parse(sessionStorage.getItem('currentUser') as any) != null ?
      JSON.parse(sessionStorage.getItem('currentUser') as any).token : null;
  }

  hasToken(): any {
    return this.getToken() != null;
  }

  getUsername(): any {
    const firstName = sessionStorage.getItem('firstName') as any;
    const lastName = sessionStorage.getItem('lastName') as any;
    return (firstName + ' ' + lastName);
  }

  getUserRole(): any {
    return sessionStorage.getItem('role') || '';
  }

  setToken(currentUser: any): any {
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));  
     sessionStorage.setItem('role',"seller1");
  }

  removeToken(): any {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('parentToken');
    sessionStorage.removeItem('role');
    this.removeUserName();
  }

  setUserName(userNameObj: any) {
    sessionStorage.setItem('firstName', userNameObj.firstName);
    sessionStorage.setItem('lastName', userNameObj.lastName);
  }

  removeUserName() {
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
  }
}
