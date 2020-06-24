import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UnsubscribeRoutingModule } from './unsubscribe-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { UnsubscribeComponent } from './unsubscribe.component';

@NgModule({
  declarations: [UnsubscribeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, UnsubscribeRoutingModule],
})
export class UnsubscribeModule {}
