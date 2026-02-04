import {NgModule} from '@angular/core';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {UiSwitchModule} from 'ngx-ui-switch';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'ngx-moment';
import {ADMIN_ROUTES} from './admin.routing';

@NgModule({
  imports: [
    RouterModule.forChild(ADMIN_ROUTES),
    CommonModule,
    FormsModule,
    PaginationModule,
    ReactiveFormsModule,
    PopoverModule,
    ConfirmationPopoverModule,

    UiSwitchModule,
    AngularMultiSelectModule,
    MomentModule,
  ],
  declarations: [],

  exports: [],
})
export class AdminModule {
}
