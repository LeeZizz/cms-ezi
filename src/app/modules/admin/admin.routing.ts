import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
    {
        path: 'project-category',
        loadChildren: () => import('./project-category/project-category.module').then(m => m.ProjectCategoryModule),
    },
    {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
    },
    {
        path: 'users',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
    },
];

