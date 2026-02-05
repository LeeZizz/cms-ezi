import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
    {
        path: 'project-category',
        loadChildren: () => import('./project-category/project-category.module').then(m => m.ProjectCategoryModule),
    },
];

