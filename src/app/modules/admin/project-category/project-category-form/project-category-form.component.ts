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

    // Expandable row tracking
    expandedFieldIndex: number | null = null;

    // Search fields
    fieldSearchKeyword: string = '';
    filteredFields: any[] = [];

    // Pagination
    pageSize: number = 5;
    currentPage: number = 1;
    Math = Math; // Reference để dùng trong template

    get totalPages(): number {
        return Math.ceil(this.filteredFields.length / this.pageSize);
    }

    get pagedFields(): any[] {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredFields.slice(start, end);
    }

    fieldTypes = [
        { value: 'text', label: 'Văn bản (Text)' },
        { value: 'number', label: 'Số (Number)' },
        { value: 'date', label: 'Ngày tháng (Date)' },
        { value: 'select', label: 'Lựa chọn (Select)' },
        { value: 'html', label: 'Siêu văn bản (HTML)' },
        { value: 'images', label: 'Nhiều ảnh (Images)' },
        { value: 'video', label: 'Video' },
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

    // Cập nhật danh sách field đã lọc
    updateFilteredFields() {
        const keyword = this.fieldSearchKeyword.toLowerCase().trim();
        if (!keyword) {
            this.filteredFields = this.schemaFormArray.controls;
        } else {
            this.filteredFields = this.schemaFormArray.controls.filter(field => {
                const code = (field.get('code')?.value || '').toLowerCase();
                const label = (field.get('label')?.value || '').toLowerCase();
                return code.includes(keyword) || label.includes(keyword);
            });
        }
    }

    // Tìm kiếm thuộc tính
    onFieldSearch() {
        this.currentPage = 1; // Reset về trang 1 khi search
        this.updateFilteredFields();
        this.expandedFieldIndex = null; // Thu gọn khi tìm kiếm
    }

    // Xóa tìm kiếm
    clearFieldSearch() {
        this.fieldSearchKeyword = '';
        this.currentPage = 1;
        this.updateFilteredFields();
    }

    // Chuyển trang
    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.expandedFieldIndex = null; // Thu gọn khi chuyển trang
        }
    }

    // Toggle mở rộng/thu gọn hàng
    toggleFieldExpand(index: number) {
        if (this.expandedFieldIndex === index) {
            this.expandedFieldIndex = null; // Thu gọn
        } else {
            this.expandedFieldIndex = index; // Mở rộng
        }
    }

    // Thêm field mới và tự động mở panel
    addFieldAndExpand() {
        this.addField();
        this.clearFieldSearch(); // Reset search để thấy field mới

        // Chuyển đến trang cuối (nơi field mới được thêm)
        this.currentPage = this.totalPages;

        // Set expanded index là vị trí trong pagedFields (trang cuối)
        const totalItems = this.filteredFields.length;
        const itemsInLastPage = totalItems % this.pageSize || this.pageSize;
        this.expandedFieldIndex = itemsInLastPage - 1;
    }

    addField() {
        const fieldGroup = this.fb.group({
            code: [''], // Mã thuộc tính
            label: ['', Validators.required],
            type: ['text', Validators.required],
            required: [false],
            description: [''],
            placeholder: [''],
            defaultValue: [''], // Giá trị mặc định
            options: [''],
        });
        this.schemaFormArray.push(fieldGroup);
        this.updateFilteredFields();
    }

    removeField(index: number) {
        // Tìm actual index trong schemaFormArray từ pagedFields
        const actualIndex = this.schemaFormArray.controls.indexOf(this.pagedFields[index]);
        if (actualIndex > -1) {
            this.schemaFormArray.removeAt(actualIndex);
        }
        this.updateFilteredFields();
        // Reset expanded
        if (this.expandedFieldIndex === index) {
            this.expandedFieldIndex = null;
        } else if (this.expandedFieldIndex !== null && this.expandedFieldIndex > index) {
            this.expandedFieldIndex--;
        }
    }

    // Lấy label cho loại field
    getFieldTypeLabel(typeValue: string): string {
        const found = this.fieldTypes.find(t => t.value === typeValue);
        return found ? found.label : typeValue;
    }

    // Lấy actual index trong schemaFormArray từ pagedFields index
    getActualIndex(pagedIndex: number): number {
        const field = this.pagedFields[pagedIndex];
        return this.schemaFormArray.controls.indexOf(field);
    }

    loadCategory() {
        // Mock data cho edit mode
        // TODO: Thay bằng API call thực tế
        const mockCategory = {
            id: this.id,
            name: 'Căn hộ ' + this.typeLabel,
            description: 'Dự án căn hộ ' + this.typeLabel,
            type: this.type,
            schema: [
                { code: 'dientich', label: 'Diện tích (m²)', type: 'number', required: true, description: 'Diện tích sử dụng', placeholder: 'Nhập diện tích...', defaultValue: '', options: '' },
                { code: 'sophongngu', label: 'Số phòng ngủ', type: 'number', required: true, description: '', placeholder: '', defaultValue: '2', options: '' },
                { code: 'huong', label: 'Hướng', type: 'select', required: false, description: 'Hướng của căn hộ', placeholder: 'Chọn hướng', defaultValue: 'Đông', options: 'Đông, Tây, Nam, Bắc, Đông Nam, Tây Nam, Đông Bắc, Tây Bắc' },
                { code: 'gia', label: 'Giá thuê/tháng', type: 'number', required: true, description: '', placeholder: 'Nhập giá...', defaultValue: '', options: '' },
                { code: 'sophongvesinh', label: 'Số phòng vệ sinh', type: 'number', required: false, description: 'Số phòng tắm/WC', placeholder: 'Nhập số...', defaultValue: '1', options: '' },
                { code: 'noithat', label: 'Nội thất', type: 'select', required: false, description: 'Tình trạng nội thất', placeholder: 'Chọn...', defaultValue: '', options: 'Đầy đủ, Cơ bản, Trống' },
            ]
        };

        // Set form values
        this.categoryForm.patchValue({
            name: mockCategory.name,
            description: mockCategory.description
        });

        // Thêm các field từ schema
        mockCategory.schema.forEach(field => {
            const fieldGroup = this.fb.group({
                code: [field.code],
                label: [field.label, Validators.required],
                type: [field.type, Validators.required],
                required: [field.required],
                description: [field.description],
                placeholder: [field.placeholder],
                defaultValue: [field.defaultValue || ''], // Giá trị mặc định
                options: [field.options],
            });
            this.schemaFormArray.push(fieldGroup);
        });
        this.updateFilteredFields();
    }

    save() {
        if (this.categoryForm.invalid) {
            alert('Vui lòng kiểm tra lại thông tin form!');
            return;
        }

        const value = this.categoryForm.value;
        value.type = this.type;

        // Chuyển đổi options từ string sang array
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
