import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { UserService } from 'src/app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/utility/confirm-password.validator';
import { utility } from 'src/app/utility';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private stop$: Subject<any>;
  private token: string;

  passwordForm: FormGroup;
  isHidePassword: boolean;
  isHideConfirmPassword: boolean;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) {
    this.setVariables();
    this.setForm();
  }

  ngOnInit(): void {
    this.setRouteEventListener();
  }

  ngOnDestroy(): void {}

  setVariables(): void {
    this.stop$ = new Subject();
    this.isHidePassword = true;
    this.isHideConfirmPassword = true;
  }

  setRouteEventListener(): void {
    this.route.paramMap.subscribe((params) => {
      const token = params.get('token');
      if (!token) return;
      this.token = token;
    });
  }

  setForm(): void {
    this.passwordForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  onResetPassword(event): void {
    event.preventDefault();
    if (this.passwordForm.invalid) return;

    const password = {
      Password: this.passwordForm.get('password').value,
      Reset_Code: this.token,
    };
    this.userService.resetPassword(password).subscribe(
      (res) => {
        const { Success } = res;
        if (Success) {
          utility.successMsg('Password successfully updated. You may now sign in.');
          return;
        }

        utility.dangerMsg('Invalid Reset Code.');
      },
      (err) => {
        console.error('reset password: ', err);
      }
    );
  }
}
