import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'company',
        loadChildren: './pages/company/company.module#CompanyModule',
      },
      {
        path: 'customer',
        loadChildren: './pages/customer/customer.module#CustomerModule',
      },
      {
        path: 'unsubscribeEmails',
        loadChildren: './pages/unsubscribe/unsubscribe.module#UnsubscribeModule',
      },
    ],
  },
  {
    path: 'live-view',
    loadChildren: './pages/live-view/live-view.module#LiveViewModule',
  },
  {
    path: 'unsubscribe',
    loadChildren: './pages/unsubscribe/unsubscribe.module#UnsubscribeModule',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/auth/auth.module#AuthModule',
      },
    ],
  },
];
