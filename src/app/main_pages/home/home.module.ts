import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NbMenuModule} from '@nebular/theme';
import {ThemeModule} from '../../@theme';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PopoverModule} from "ngx-bootstrap/popover";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {UiSwitchModule} from "ngx-ui-switch";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {MomentModule} from "ngx-moment";
import {RouterModule, Routes} from "@angular/router";
import {MODULES_ROUTES} from "../../modules";

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: MODULES_ROUTES,
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NbMenuModule,
    ThemeModule,
    PaginationModule,
    ReactiveFormsModule,
    PopoverModule,
    ConfirmationPopoverModule,
    UiSwitchModule,
    AngularMultiSelectModule,
    MomentModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule {
}
