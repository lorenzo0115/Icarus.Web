import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/guards/auth.guard';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'site',
        loadChildren: './customer-site/customer-site.module#CustomerSiteModule',
      },
      {
        path: 'estimate',
        loadChildren: './customer-estimate/customer-estimate.module#CustomerEstimateModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
