import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberPipe } from './phone-number.pipe';
import { TreeImgNotePipe } from './tree-img-note.pipe';
import { MapMarkerPipe } from './map-marker/map-marker.pipe';
import { DateMaskPipe } from './date/date-mask.pipe';

@NgModule({
  declarations: [PhoneNumberPipe, TreeImgNotePipe, MapMarkerPipe, DateMaskPipe],
  imports: [CommonModule],
  exports: [PhoneNumberPipe, TreeImgNotePipe, MapMarkerPipe, DateMaskPipe],
})
export class PipesModule {}
