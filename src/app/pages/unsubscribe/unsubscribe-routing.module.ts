import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnsubscribeComponent } from './unsubscribe.component';

const routes: Routes = [
  {
    path: '',
    component: UnsubscribeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnsubscribeRoutingModule {}
