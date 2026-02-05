import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { ProjectCategoryListComponent } from './project-category-list/project-category-list.component';
import { ProjectCategoryFormComponent } from './project-category-form/project-category-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: ':type',
        component: ProjectCategoryListComponent,
    },
    {
        path: ':type/create',
        component: ProjectCategoryFormComponent,
    },
    {
        path: ':type/edit/:id',
        component: ProjectCategoryFormComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        NbIconModule,
        NbSelectModule,
        NbToggleModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        ProjectCategoryListComponent,
        ProjectCategoryFormComponent,
    ],
})
export class ProjectCategoryModule {
}
