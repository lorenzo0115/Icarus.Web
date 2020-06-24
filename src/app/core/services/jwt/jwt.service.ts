import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken(): string {
    return window.localStorage.getItem('accessToken');
  }

  saveToken(token: string) {
    window.localStorage.setItem('accessToken', token);
  }

  destroyToken() {
    window.localStorage.removeItem('accessToken');
  }

}
