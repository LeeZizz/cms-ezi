import { CrudModel } from '../../core/crud/crud-model';

// Interface cho từng option trong trường Select
export interface SelectOption {
    value: string;
    label: string;
    description?: string; // Mô tả chi tiết cho option
}

export interface DynamicField {
    label: string;
    type: 'text' | 'number' | 'date' | 'select' | 'html'; // Thêm kiểu 'html' cho siêu văn bản
    required: boolean;
    description?: string; // Mô tả cho trường (hiển thị dưới label)
    placeholder?: string; // Placeholder text
    options?: SelectOption[]; // Dùng cho kiểu select - giờ là object thay vì string
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
