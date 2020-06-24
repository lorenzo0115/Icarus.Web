import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';

import { LiveViewRoutingModule } from './live-view-routing.module';
import { ComponentModule } from 'src/app/component/component.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import {
  LiveViewHeaderComponent,
  LivViewAssetChartComponent,
  LivViewServiceChartComponent,
  LivViewOtherServiceChartComponent,
  LiveViewAssetTableComponent,
  LiveViewServiceTableComponent,
  LiveViewSiteHeaderComponent,
} from './_components';
import { LiveViewComponent } from './live-view.component';

@NgModule({
  declarations: [
    LiveViewComponent,
    LiveViewHeaderComponent,
    LivViewAssetChartComponent,
    LivViewServiceChartComponent,
    LivViewOtherServiceChartComponent,
    LiveViewAssetTableComponent,
    LiveViewServiceTableComponent,
    LiveViewSiteHeaderComponent,
  ],
  imports: [CommonModule, NgxSpinnerModule, PipesModule, ComponentModule, MaterialModule, LiveViewRoutingModule],
})
export class LiveViewModule {}
