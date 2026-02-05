import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbBadgeModule,
    NbRadioModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbContextMenuModule,
} from '@nebular/theme';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';

const routes: Routes = [
    { path: ':type', component: ProjectListComponent },
    { path: ':type/create', component: ProjectFormComponent },
    { path: ':type/edit/:id', component: ProjectFormComponent },
];

@NgModule({
    declarations: [
        ProjectListComponent,
        ProjectFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        NbInputModule,
        NbSelectModule,
        NbBadgeModule,
        NbRadioModule,
        NbCheckboxModule,
        NbDatepickerModule,
        NbContextMenuModule,
    ],
})
export class ProjectModule { }
