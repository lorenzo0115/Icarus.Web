import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/core';
import { utility } from 'src/app/utility';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
  private token: string;

  isLoading: boolean;
  isTokenValid: boolean;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.setRouteEventListener();
  }

  setVariables(): void {
    this.isLoading = true;
    this.isTokenValid = false;
  }

  setRouteEventListener(): void {
    this.route.paramMap.subscribe((params) => {
      this.token = params.get('token');
      if (this.token) {
        this.confirmEmail();
      }
    });
  }

  confirmEmail(): void {
    this.userService.confirmEmail(this.token).subscribe(
      ({ Successful }) => {
        this.isLoading = false;
        this.isTokenValid = Successful;
        if (Successful) {
          utility.successMsg('E-mail Confirmation successful! You may now log into Sparrow.');
        } else {
          utility.dangerMsg('Invalid Confirmation Code.');
        }
      },
      () => {
        this.isLoading = false;
        this.isTokenValid = false;
        utility.dangerMsg('Invalid Confirmation Code.');
      }
    );
  }

  onLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
