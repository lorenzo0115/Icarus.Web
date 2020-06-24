import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentModule } from 'src/app/component/component.module';
import { CustomerSiteRoutingModule } from './customer-site-routing.module';

import {
  CustomerSiteEstimateComponent,
  CustomerSiteHeaderComponent,
  CustomerSiteMapComponent,
  CustomerSiteCardComponent,
} from './_components';
import { CustomerSiteAssetListComponent } from './customer-site-asset-list/customer-site-asset-list.component';
import { CustomerSiteEstimateListComponent } from './customer-site-estimate-list/customer-site-estimate-list.component';
import { CustomerSiteListComponent } from './customer-site-list/customer-site-list.component';
import { CustomerSiteComponent } from './customer-site.component';

import { CustomerSiteService } from './_core';

@NgModule({
  declarations: [
    CustomerSiteEstimateComponent,
    CustomerSiteHeaderComponent,
    CustomerSiteMapComponent,
    CustomerSiteAssetListComponent,
    CustomerSiteEstimateListComponent,
    CustomerSiteListComponent,
    CustomerSiteCardComponent,
    CustomerSiteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqAaqErAb9CllThpl5z4H5tHJVDBpO0IE',
    }),
    PipesModule,
    MaterialModule,
    ComponentModule,
    CustomerSiteRoutingModule,
  ],
  providers: [CustomerSiteService],
})
export class CustomerSiteModule {}
