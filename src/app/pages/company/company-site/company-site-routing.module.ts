import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanySiteListComponent } from './company-site-list/company-site-list.component';
import { CompanySiteDetailComponent } from './company-site-detail/company-site-detail.component';

const routes: Routes = [
  { path: '', component: CompanySiteListComponent },
  { path: ':id', component: CompanySiteDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanySiteRoutingModule {}
