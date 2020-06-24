import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentModule } from 'src/app/component/component.module';
import { CustomerEstimateRoutingModule } from './customer-estimate-routing.module';

import {
  CustomerEstimateCardComponent,
  CustomerEstimateHeaderComponent,
  CustomerEstimateItemListComponent,
  CustomerEstimateSiteHeaderComponent,
} from './_components';
import { CustomerEstimateListComponent } from './customer-estimate-list/customer-estimate-list.component';
import { CustomerEstimateDetailComponent } from './customer-estimate-detail/customer-estimate-detail.component';
import { CustomerEstimateComponent } from './customer-estimate.component';

import { CustomerEstimateService } from './_core';

@NgModule({
  declarations: [
    CustomerEstimateDetailComponent,
    CustomerEstimateCardComponent,
    CustomerEstimateHeaderComponent,
    CustomerEstimateListComponent,
    CustomerEstimateItemListComponent,
    CustomerEstimateSiteHeaderComponent,
    CustomerEstimateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    MaterialModule,
    ComponentModule,
    CustomerEstimateRoutingModule,
  ],
  providers: [CustomerEstimateService],
})
export class CustomerEstimateModule {}
