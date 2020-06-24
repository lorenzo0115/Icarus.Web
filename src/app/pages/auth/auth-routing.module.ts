import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    children: [
      { path: '', component: RegisterComponent },
      { path: ':token', component: RegisterComponent },
    ],
  },
  {
    path: 'ResetPassword',
    children: [
      { path: '', component: ResetPasswordComponent },
      { path: ':token', component: ResetPasswordComponent },
    ],
  },
  { path: 'complete-registration', component: RegistrationComponent },
  {
    path: 'confirmemail',
    children: [
      { path: '', component: ConfirmEmailComponent },
      { path: ':token', component: ConfirmEmailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
