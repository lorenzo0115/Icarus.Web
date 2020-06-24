import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { ComponentModule } from 'src/app/component/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CompanySiteRoutingModule } from './company-site-routing.module';

import { CompanySiteCardComponent, CompanySiteMapComponent } from './_components';
import { CompanySiteListComponent } from './company-site-list/company-site-list.component';
import { CompanySiteDetailComponent } from './company-site-detail/company-site-detail.component';

import { CompanySiteService, CompanySiteStateService } from './_core';

@NgModule({
  declarations: [
    CompanySiteListComponent,
    CompanySiteDetailComponent,
    CompanySiteCardComponent,
    CompanySiteMapComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqAaqErAb9CllThpl5z4H5tHJVDBpO0IE',
    }),
    ComponentModule,
    PipesModule,
    MaterialModule,
    CompanySiteRoutingModule,
  ],
  providers: [CompanySiteService, CompanySiteStateService],
})
export class CompanySiteModule {}
