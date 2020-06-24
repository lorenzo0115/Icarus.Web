import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { utility } from 'src/app/utility';
import { UserService } from 'src/app/core';
import { ConfirmPasswordValidator } from 'src/app/utility/confirm-password.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  passwordForm: FormGroup;

  isLoaded: boolean;
  isConfirmed: boolean;
  isCompleted: boolean;
  isHidePassword: boolean;
  isHideConfirmPassword: boolean;
  confirmationCode: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) {
    this.setForm();
    this.setVariables();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const code = params['ConfirmationCode'];
      this.confirmationCode = code;
      if (Boolean(code)) {
        this.confirmRegistration(code);
      }
    });
  }

  setVariables(): void {
    this.isLoaded = false;
    this.isConfirmed = false;
    this.isCompleted = false;
    this.isHidePassword = true;
    this.isHideConfirmPassword = true;
  }

  setForm(): void {
    this.passwordForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: ConfirmPasswordValidator.MatchPassword }
    );
  }

  confirmRegistration(code: string): void {
    this.userService.confirmRegistration(code).subscribe(({ Already_Registered: isConfirmed }) => {
      this.isLoaded = true;
      this.isConfirmed = isConfirmed;
      this.isConfirmed
        ? utility.successMsg('E-mail is already registered. You can login now.')
        : utility.infoMsg('E-mail is not registered. Please complete email registration.');
    });
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onCompleteRegistration(event) {
    event.preventDefault();

    if (this.passwordForm.invalid) {
      return;
    }

    const { password } = this.passwordForm.value;
    this.userService.completeRegistration(this.confirmationCode, password).subscribe(
      (res) => {
        this.isCompleted = true;
        utility.successMsg('Registration successfully completed.');
      },
      (err) => {
        this.isCompleted = false;
        utility.dangerMsg('Complete registration failed.');
      }
    );
  }
}
