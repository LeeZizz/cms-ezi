import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../../models/admin/project';
import { ProjectCategory, DynamicField } from '../../../../models/admin/project-category';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
    type: 'rent' | 'sale' = 'rent';
    typeLabel: string = 'cho thuê';
    isEdit: boolean = false;
    projectId: number | null = null;

    // Step 1: Chọn danh mục
    selectedCategoryId: number | null = null;
    categories: ProjectCategory[] = [];

    // Step 2: Form dự án
    project: Project = new Project();
    selectedCategory: ProjectCategory | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.type = params.get('type') as 'rent' | 'sale';
            this.typeLabel = this.type === 'rent' ? 'cho thuê' : 'bán';

            // Load categories trước
            this.loadCategories();

            const id = params.get('id');
            if (id) {
                this.isEdit = true;
                this.projectId = parseInt(id, 10);
                // Load project sau khi đã có categories
                this.loadProject();
            }
        });
    }

    loadCategories() {
        // Mock data - Danh sách danh mục theo type
        this.categories = [
            {
                id: 1,
                name: 'Căn hộ ' + this.typeLabel,
                description: 'Dự án căn hộ ' + this.typeLabel,
                type: this.type,
                schema: [
                    { label: 'Diện tích (m²)', type: 'number', required: true },
                    { label: 'Số phòng ngủ', type: 'number', required: true },
                    { label: 'Số phòng vệ sinh', type: 'number', required: false },
                    { label: 'Hướng', type: 'select', required: false, options: ['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Nam', 'Tây Nam', 'Đông Bắc', 'Tây Bắc'] },
                    { label: 'Giá ' + (this.type === 'rent' ? 'thuê/tháng' : 'bán'), type: 'number', required: true },
                ],
            } as any,
            {
                id: 2,
                name: 'Nhà phố ' + this.typeLabel,
                description: 'Dự án nhà phố ' + this.typeLabel,
                type: this.type,
                schema: [
                    { label: 'Diện tích đất (m²)', type: 'number', required: true },
                    { label: 'Diện tích xây dựng (m²)', type: 'number', required: true },
                    { label: 'Số tầng', type: 'number', required: true },
                    { label: 'Số phòng ngủ', type: 'number', required: true },
                    { label: 'Mặt tiền (m)', type: 'number', required: false },
                    { label: 'Giá ' + (this.type === 'rent' ? 'thuê/tháng' : 'bán'), type: 'number', required: true },
                ],
            } as any,
            {
                id: 3,
                name: 'Biệt thự ' + this.typeLabel,
                description: 'Dự án biệt thự ' + this.typeLabel,
                type: this.type,
                schema: [
                    { label: 'Diện tích đất (m²)', type: 'number', required: true },
                    { label: 'Diện tích xây dựng (m²)', type: 'number', required: true },
                    { label: 'Số tầng', type: 'number', required: true },
                    { label: 'Số phòng ngủ', type: 'number', required: true },
                    { label: 'Hồ bơi', type: 'select', required: false, options: ['Có', 'Không'] },
                    { label: 'Sân vườn', type: 'select', required: false, options: ['Có', 'Không'] },
                    { label: 'Giá ' + (this.type === 'rent' ? 'thuê/tháng' : 'bán'), type: 'number', required: true },
                ],
            } as any,
        ];
    }

    loadProject() {
        // Mock data cho edit mode
        this.project = {
            id: this.projectId,
            name: 'Vinhomes Grand Park - Block S1',
            categoryId: 1,
            status: 'published',
            data: {
                'Diện tích (m²)': 75,
                'Số phòng ngủ': 2,
                'Số phòng vệ sinh': 2,
                'Hướng': 'Đông Nam',
                'Giá thuê/tháng': 15000000,
            },
        } as any;

        this.selectedCategoryId = this.project.categoryId;
        this.onCategoryChange();
    }

    onCategoryChange() {
        this.selectedCategory = this.categories.find(c => c.id === this.selectedCategoryId) || null;

        // Khởi tạo data object với các key từ schema (nếu chưa có)
        if (this.selectedCategory && !this.isEdit) {
            this.project.data = {};
            this.selectedCategory.schema.forEach(field => {
                this.project.data[field.label] = '';
            });
        }
    }

    getFieldKey(field: DynamicField): string {
        return field.label;
    }

    onSubmit() {
        if (!this.selectedCategory) {
            alert('Vui lòng chọn danh mục!');
            return;
        }

        if (!this.project.name) {
            alert('Vui lòng nhập tên dự án!');
            return;
        }

        this.project.categoryId = this.selectedCategoryId!;

        console.log('Submitting project:', this.project);
        alert('Đã lưu dự án thành công! (Mock)');
        this.router.navigate(['/admin/project', this.type]);
    }

    cancel() {
        this.router.navigate(['/admin/project', this.type]);
    }
}
