import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthDirective } from './show-auth.directive';
import { UserRoleDirective } from './user-role.directive';

@NgModule({
  exports: [ShowAuthDirective, UserRoleDirective],
  imports: [CommonModule],
  declarations: [ShowAuthDirective, UserRoleDirective],
})
export class DirectivesModule {}
