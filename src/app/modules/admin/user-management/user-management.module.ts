import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbToggleModule, NbTooltipModule, NbUserModule } from '@nebular/theme';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbUserModule,
    NbSpinnerModule,
    NbToggleModule,
    NbTooltipModule,
    NbFormFieldModule,
    NbTabsetModule
  ]
})
export class UserManagementModule { }
