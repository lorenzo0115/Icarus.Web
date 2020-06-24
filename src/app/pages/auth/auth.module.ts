import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../../shared/material/material.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegistrationComponent, ResetPasswordComponent, ConfirmEmailComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, MaterialModule, AuthRoutingModule],
})
export class AuthModule {}
