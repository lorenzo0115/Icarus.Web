import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators/tap';

import isEmpty from 'lodash/isEmpty';

import * as jwt_decode from 'jwt-decode';

import { UserService, CommonService } from 'src/app/core';
import { USER_ROLE, USER_ROLES } from 'src/app/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  userType: USER_ROLE;
  companies: any = null;

  constructor(private readonly _userService: UserService, private readonly _commonService: CommonService) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.getUser();
    this.getCompanies();
  }

  setVariables(): void {
    this.user = Object.create(null);
    this.userType = USER_ROLE.UNKNOWN;
  }

  getUser() {
    this._userService.currentUser.subscribe((user) => {
      this.user = user;
      if (!isEmpty(this.user)) {
        this.getUserType();
      }
    });
  }

  getUserType() {
    try {
      const data = jwt_decode(this.user.token);
      Object.keys(USER_ROLES).forEach((key) => {
        if (key.toLowerCase() === data.role.toLowerCase()) {
          this.userType = USER_ROLES[key];
        }
      });
    } catch (e) {
      console.error('decode jwt token: ', e);
    }
  }

  getCompanies() {
    this._commonService
      .getCompanies()
      .pipe(tap((res) => (this.companies = res)))
      .subscribe(() => {});
  }

  public get isCompanyUser(): boolean {
    return this.userType === USER_ROLE.COMPANY;
  }
}
