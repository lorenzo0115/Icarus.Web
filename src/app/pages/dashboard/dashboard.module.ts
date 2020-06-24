import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { DashboardComponent } from './dashboard.component';
import { CurrentEstimateSummaryComponent } from './_components';

@NgModule({
  declarations: [DashboardComponent, CurrentEstimateSummaryComponent],
  imports: [CommonModule, MaterialModule, DashboardRoutingModule],
})
export class DashboardModule {}
