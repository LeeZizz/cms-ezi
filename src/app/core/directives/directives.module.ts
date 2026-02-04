import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LabelStatusComponent} from './label-status';
import {ButtonCopyComponent} from './button-copy';
import {LabelTypeComponent} from './label-type';
import {LabelTypeTextComponent} from './label-type-text';
import {SearchFormComponent} from './search-form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {CrudFormComponent} from './crud-form';
import {LabelYesNoComponent} from './label-yes-no';
import {CrudPaginatorComponent} from './crud-paginator';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {SimpleTreeComponent} from './simple-tree';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {X6FlowComponent} from './x6-flow';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {ConfirmWindowComponent} from './confirm-window';
import {NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule, NbTimepickerModule} from '@nebular/theme';
import {InputWindowComponent} from './input-window';
import {CrudModalComponent} from './crud-modal-component';
import {CrudListComponent} from './crud-list-component';
import {HtmEditorComponent} from "./html-editor";
import {ModalComponent} from "./modal-component";
import {UiSwitchModule} from "ngx-ui-switch";
import {ButtonConfirmComponent} from "./button-confirm";
import {NbMomentDateModule} from "@nebular/moment";
import {NbDateFnsDateModule} from "@nebular/date-fns";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    PaginationModule,
    ConfirmationPopoverModule,
    CdkDrag,
    NbCardModule,
    UiSwitchModule,
    NbSpinnerModule,
    NbDatepickerModule,
    NbInputModule,
    NbTimepickerModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
  ],
  declarations: [
    LabelStatusComponent,
    ButtonCopyComponent,
    LabelTypeComponent,
    LabelTypeTextComponent,
    SearchFormComponent,
    CrudFormComponent,
    LabelYesNoComponent,
    CrudPaginatorComponent,
    SimpleTreeComponent,
    X6FlowComponent,
    ConfirmWindowComponent,
    InputWindowComponent,
    CrudModalComponent,
    CrudListComponent,
    HtmEditorComponent,
    ModalComponent,
    ButtonConfirmComponent,
  ],
  exports: [
    LabelStatusComponent,
    ButtonCopyComponent,
    LabelTypeComponent,
    LabelTypeTextComponent,
    SearchFormComponent,
    CrudFormComponent,
    LabelYesNoComponent,
    CrudPaginatorComponent,
    SimpleTreeComponent,
    X6FlowComponent,
    ConfirmWindowComponent,
    InputWindowComponent,
    CrudModalComponent,
    CrudListComponent,
    HtmEditorComponent,
    ModalComponent,
    ButtonConfirmComponent,
  ],
})
export class DirectivesModule {
}
