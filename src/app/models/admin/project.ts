import { CrudModel } from '../../core/crud/crud-model';

export type ProjectStatus = 'planning' | 'handover' | 'completed';

export class Project extends CrudModel {
    name: string;
    categoryId: number;
    categoryName?: string; // Để hiển thị tên danh mục trong list
    projectStatus: ProjectStatus; // Trạng thái dự án: Đang lên kế hoạch/Bàn giao/Hoàn thành
    data: { [key: string]: any }; // Dữ liệu động theo category.schema
    ownerName?: string; // Tên chủ sở hữu (username)

    constructor() {
        super();
        this.name = '';
        this.categoryId = 0;
        this.projectStatus = 'planning';
        this.data = {};
    }
}
