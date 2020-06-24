import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSiteListComponent } from './customer-site-list/customer-site-list.component';
import { CustomerSiteAssetListComponent } from './customer-site-asset-list/customer-site-asset-list.component';
import { CustomerSiteEstimateListComponent } from './customer-site-estimate-list/customer-site-estimate-list.component';
import { CustomerSiteComponent } from './customer-site.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerSiteComponent,
    children: [
      { path: '', component: CustomerSiteListComponent },
      {
        path: ':id',
        children: [
          { path: 'asset', component: CustomerSiteAssetListComponent },
          { path: 'estimate', component: CustomerSiteEstimateListComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSiteRoutingModule {}
