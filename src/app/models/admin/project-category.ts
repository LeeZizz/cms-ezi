import { CrudModel } from '../../core/crud/crud-model';

// Interface cho từng option trong trường Select
export interface SelectOption {
    value: string;
    label: string;
    description?: string; // Mô tả chi tiết cho option
}

export interface DynamicField {
    label: string;
    type: 'text' | 'number' | 'date' | 'select' | 'html' | 'images' | 'video'; // Thêm 'images' và 'video' cho media
    required: boolean;
    description?: string; // Mô tả cho trường (hiển thị dưới label)
    placeholder?: string; // Placeholder text
    options?: SelectOption[]; // Dùng cho kiểu select
    maxFiles?: number; // Giới hạn số file upload (cho images/video)
    acceptUrl?: boolean; // Cho phép nhập URL thay vì upload (mặc định true)
}

export class ProjectCategory extends CrudModel {
    name: string;
    description: string;
    type: 'sale' | 'rent';
    schema: DynamicField[];
    projectCount?: number;

    constructor() {
        super();
        this.name = '';
        this.description = '';
        this.type = 'sale';
        this.schema = [];
    }
}
