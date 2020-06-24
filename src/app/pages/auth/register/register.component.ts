import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { tap } from 'rxjs/operators/tap';

import { UserService } from 'src/app/core';
import { ConfirmPasswordValidator } from 'src/app/utility/confirm-password.validator';
import { utility } from 'src/app/utility';

@Component({
  selector: 'app-register-cmp',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  token: string;
  registerForm: FormGroup;

  isHidePassword: boolean;
  isHideConfirmPassword: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) {
    this.isHidePassword = true;
    this.isHideConfirmPassword = true;
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');

    this.setForm();
    this.setRouteEventListener();
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
  }

  setForm() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        token: [''],
      },
      { validators: ConfirmPasswordValidator.MatchPassword }
    );
  }

  setRouteEventListener(): void {
    this.route.paramMap
      .pipe(
        tap((param) => {
          const token = param.get('token');
          this.token = token;

          if (this.token) {
            this.getUserByToken();
            this.registerForm.get('token').setValue(this.token);
          }
        })
      )
      .subscribe(() => {});
  }

  getUserByToken() {
    this.userService.getUserByToken(this.token).subscribe(
      (res) => {
        const { First_Name: firstName, Last_Name: lastName, Email: email } = res;
        this.setFormValue({ firstName, lastName, email });
      },
      (err) => {
        console.error('error: ', err);
      }
    );
  }

  setFormValue(data) {
    this.registerForm.patchValue(data);
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const {
      firstName: First_Name,
      lastName: Last_Name,
      email: Email,
      password: Password,
      token: CCID,
    } = this.registerForm.value;
    this.userService.registerUser({ First_Name, Last_Name, Email, Password, CCID }).subscribe(
      () => {
        utility.successMsg(
          'A confirmation E-mail has been sent to you. You must activate your account via this e-mail prior to logging in.',
          60 * 2 * 1000
        );
        this.router.navigateByUrl('/login');
      },
      () => {
        utility.dangerMsg('Register failed.');
      }
    );
  }

  onLogin(event) {
    event.preventDefault();
    this.router.navigateByUrl('/login');
  }
}
