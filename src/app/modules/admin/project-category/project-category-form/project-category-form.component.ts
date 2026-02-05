import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectCategoryService } from '../../../../services/admin/project-category.service';
import { ProjectCategory } from '../../../../models/admin/project-category';

@Component({
    selector: 'app-project-category-form',
    templateUrl: './project-category-form.component.html',
    styleUrls: ['./project-category-form.component.css'],
})
export class ProjectCategoryFormComponent implements OnInit {
    categoryForm: FormGroup;
    isEdit = false;
    id: string;
    type: string;
    typeLabel: string;

    fieldTypes = [
        { value: 'text', label: 'Văn bản (Text)' },
        { value: 'number', label: 'Số (Number)' },
        { value: 'date', label: 'Ngày tháng (Date)' },
        { value: 'select', label: 'Lựa chọn (Select)' },
        { value: 'html', label: 'Siêu văn bản (HTML)' },
    ];

    constructor(
        private fb: FormBuilder,
        private categoryService: ProjectCategoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.initForm();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.type = params['type'];
            this.typeLabel = this.type === 'rent' ? 'cho thuê' : 'bán';
            this.id = params['id'];
            if (this.id) {
                this.isEdit = true;
                this.loadCategory();
            }
        });
    }

    initForm() {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            schema: this.fb.array([]),
        });
    }

    get schemaFormArray() {
        return this.categoryForm.get('schema') as FormArray;
    }

    addField() {
        const fieldGroup = this.fb.group({
            label: ['', Validators.required],
            type: ['text', Validators.required],
            required: [false],
            description: [''], // Mô tả cho trường
            placeholder: [''], // Placeholder text
            options: [''], // Cho kiểu select, nhập dạng comma-separated
        });
        this.schemaFormArray.push(fieldGroup);
    }

    removeField(index: number) {
        this.schemaFormArray.removeAt(index);
    }

    loadCategory() {
        // logic load...
    }

    save() {
        if (this.categoryForm.invalid) {
            alert('Vui lòng kiểm tra lại thông tin form!');
            return;
        }

        const value = this.categoryForm.value;
        value.type = this.type; // Lưu kèm loại (rent/sale)

        // Chuyển đổi options từ string sang SelectOption[]
        // Format: "Đông|Hướng đông, Tây|Hướng tây, Nam, Bắc"
        value.schema = value.schema.map(f => ({
            ...f,
            options: f.options ? f.options.split(',').map(o => {
                const parts = o.trim().split('|');
                return {
                    value: parts[0]?.trim() || '',
                    label: parts[0]?.trim() || '',
                    description: parts[1]?.trim() || ''
                };
            }) : []
        }));

        console.log('Dữ liệu lưu:', value);
        alert('Đã lưu Category (Xem console để thấy JSON)!');
        this.router.navigate(['/admin/project-category', this.type]);
    }
}
