import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { ApiService, JwtService, MapService, UserService, CommonService, StateService } from './services';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    JwtService,
    ApiService,
    MapService,
    UserService,
    CommonService,
    StateService,
    AuthGuard,
  ],
})
export class CoreModule {}
