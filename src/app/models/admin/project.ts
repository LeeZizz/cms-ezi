import { CrudModel } from '../../core/crud/crud-model';

export class Project extends CrudModel {
    name: string;
    categoryId: number;
    categoryName?: string; // Để hiển thị tên danh mục trong list
    status: 'draft' | 'published';
    data: { [key: string]: any }; // Dữ liệu động theo category.schema

    constructor() {
        super();
        this.name = '';
        this.categoryId = 0;
        this.status = 'draft';
        this.data = {};
    }
}
