import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { PipesModule } from '../shared/pipes/pipes.module';
import { MaterialModule } from '../shared/material/material.module';

import { TreeMapComponent } from './tree-map/tree-map.component';
import { TreeCardComponent } from './tree-card/tree-card.component';
import { TreeDialogComponent } from './tree-dialog/tree-dialog.component';
import { TreeFilterComponent } from './tree-filter/tree-filter.component';
import { TreeImgSlideComponent } from './tree-img-slide/tree-img-slide.component';
import { ClientTreeNodeComponent } from './client-tree-node/client-tree-node.component';
import { TreeImageViewerComponent } from './tree-image-viewer/tree-image-viewer.component';
import { TreeServicesTableComponent } from './tree-services-table/tree-services-table.component';
import { SiteTreeServiceTableComponent } from './site-tree-service-table/site-tree-service-table.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

@NgModule({
  declarations: [
    TreeMapComponent,
    TreeCardComponent,
    TreeFilterComponent,
    ClientTreeNodeComponent,
    TreeImageViewerComponent,
    TreeServicesTableComponent,
    TreeImgSlideComponent,
    SiteTreeServiceTableComponent,
    TreeDialogComponent,
    PdfViewerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqAaqErAb9CllThpl5z4H5tHJVDBpO0IE',
    }),
    PdfViewerModule,
    CarouselModule,
    PipesModule,
    MaterialModule,
  ],
  exports: [
    TreeFilterComponent,
    TreeMapComponent,
    TreeCardComponent,
    TreeImageViewerComponent,
    ClientTreeNodeComponent,
    TreeImgSlideComponent,
    TreeDialogComponent,
    PdfViewerComponent,
  ],
})
export class ComponentModule {}
