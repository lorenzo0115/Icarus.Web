import { Directive, OnInit, OnDestroy, ViewContainerRef, TemplateRef, OnChanges, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import * as jwt_decode from 'jwt-decode';

import { UserService } from 'src/app/core';
import { takeUntil } from 'rxjs/operators';
import { USER_ROLE, USER_ROLES } from 'src/app/types';

@Directive({
  selector: '[appUserRole]',
})
export class UserRoleDirective implements OnInit, OnChanges, OnDestroy {
  private _userRole: any;
  private _stop$: Subject<any>;

  @Input('appUserRole') defaultRole: USER_ROLE[];

  constructor(
    private readonly _vcRef: ViewContainerRef,
    private readonly _templateRef: TemplateRef<any>,
    private readonly _userService: UserService
  ) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnChanges(): void {}

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  setVariables(): void {
    this._stop$ = new Subject();
  }

  getUser(): void {
    this._userService.currentUser.pipe(takeUntil(this._stop$)).subscribe(({ token }) => {
      if (!token) return;
      const { role } = jwt_decode(token);
      Object.entries(USER_ROLES).forEach(([key, value]) => {
        if (key.toLowerCase() === role.toLowerCase()) {
          this._userRole = value;
        }
      });

      this.setVisibility();
    });
  }

  setVisibility(): void {
    if (this.defaultRole.includes(this._userRole)) {
      this._vcRef.createEmbeddedView(this._templateRef);
    }
  }
}
