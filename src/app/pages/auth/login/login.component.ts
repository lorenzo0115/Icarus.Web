import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { utility } from 'src/app/utility';
import { UserService } from 'src/app/core/services';

declare var $: any;

@Component({
  selector: 'app-login-cmp',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  loginForm: FormGroup;
  passwordForm: FormGroup;

  isPasswordIncorrect: boolean;
  isResetPassword: boolean;

  constructor(
    private readonly router: Router,
    private readonly element: ElementRef,
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.isPasswordIncorrect = false;
    this.isResetPassword = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    body.classList.add('off-canvas-sidebar');
    const card = document.getElementsByClassName('card')[0];
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove('card-hidden');
    }, 700);

    this.setForm();
  }
  sidebarToggle() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    const sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible === false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  setForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      opt: ['', Validators.required],
    });

    this.passwordForm.get('opt').valueChanges.subscribe((opt) => {
      if (opt === 'email') {
        this.sendResetPassEmail();
        return;
      }
    });
  }

  sendResetPassEmail() {
    const email = this.loginForm.get('email').value;
    this.userService.sendPasswordResetEmail(email).subscribe(
      (_ignore) => {
        this.isPasswordIncorrect = false;
        this.isResetPassword = false;
        utility.successMsg('An e-mail has been sent. Please check your inbox.', 20 * 1000);
      },
      (_ignore) => {}
    );
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.attemptAuth('login', this.loginForm.value).subscribe(
      () => {
        utility.successMsg('Login success.');
        this.router.navigateByUrl('/dashboard');
      },
      ({ msg, status }) => {
        utility.dangerMsg(msg, 7 * 1000);
        if (status === 403) {
          this.isPasswordIncorrect = true;
          return;
        }
      }
    );
  }

  onResetPassword() {
    this.isResetPassword = true;
  }

  onRegister(event) {
    event.preventDefault();
    this.router.navigateByUrl('/register');
  }
}
