import { CrudModel } from '../../core/crud/crud-model';

export interface DynamicField {
    label: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
    options?: string[]; // Dùng cho kiểu select
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
