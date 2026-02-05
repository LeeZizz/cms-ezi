import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCRUDService, TitleService, ToasterService } from '../../core';
import { ProjectCategory } from '../../models/admin/project-category';

@Injectable({ providedIn: 'root' })
export class ProjectCategoryService extends AbstractCRUDService<ProjectCategory> {

    constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
        super(http, title, toaster, 'Category Dự án', 'project-categories');
        this.setNamespace('admin');
    }
}
