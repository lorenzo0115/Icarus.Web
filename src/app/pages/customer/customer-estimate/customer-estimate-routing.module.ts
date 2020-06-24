import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEstimateListComponent } from './customer-estimate-list/customer-estimate-list.component';
import { CustomerEstimateDetailComponent } from './customer-estimate-detail/customer-estimate-detail.component';
import { CustomerEstimateComponent } from './customer-estimate.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerEstimateComponent,
    children: [
      { path: '', component: CustomerEstimateListComponent },
      { path: ':id', component: CustomerEstimateDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerEstimateRoutingModule {}
