import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { tap } from 'rxjs/operators/tap';

import { ApiService } from '../api/api.service';
import { JwtService } from '../jwt/jwt.service';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(0);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private readonly api: ApiService, private readonly jwtService: JwtService) {}

  getUser() {
    return this.api.get('/General/UserInfo');
  }

  populate() {
    if (this.jwtService.getToken()) {
      this.getUser().subscribe(
        (res) => {
          const token = res.headers.get('JwtToken');
          if (Boolean(token)) {
            const user = { ...res.body, token };
            this.setAuth(user);
          }
        },
        () => {
          this.purgeAuth();
        }
      );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: any) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({});
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, { email: Email, password: Password }): Observable<any> {
    const route = type === 'login' ? '/Login' : '';
    return this.api.post('/User' + route, { Email, Password }).pipe(
      map((res) => res.body),
      tap(({ token }) => {
        const { User_ID, User_Name } = jwt_decode(token);
        const user = { token, Full_Name: User_Name, User_ID };
        this.setAuth(user);
      })
    );
  }

  confirmRegistration(code: string) {
    return this.api.get(`/User/AccountRegistrationCheck?Confirmation_Code=${code}`).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  completeRegistration(confirmation_code: string, password: string) {
    return this.api
      .put('/User/CompleteEmailRegistration', { Confirmation_Code: confirmation_code, Password: password })
      .pipe(
        map((res: HttpResponse<any>) => {
          return res.body;
        })
      );
  }

  unsubscribe(email: string) {
    return this.api.put('/User/UnsubscribeEmail', { Email_Address: email }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getUserByToken(token: string) {
    return this.api.get(`/CCID?CCID=${token}`).pipe(map((res) => res.body));
  }

  registerUser(user: any) {
    return this.api.post('/CustomerAccount', user).pipe(map((res) => res.body));
  }

  resetPassword(password: any) {
    return this.api.put('/User/ResetPassword', password).pipe(map((res) => res.body));
  }

  confirmEmail(code: string) {
    return this.api.post('/CustomerAccount/ConfirmEmail', { Confirmation_Code: code }).pipe(map((res) => res.body));
  }

  sendPasswordResetEmail(email) {
    return this.api.put('/User/PasswordResetEmail', { Email_Address: email });
  }
}
