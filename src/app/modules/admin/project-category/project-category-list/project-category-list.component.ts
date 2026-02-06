import { Component, OnInit } from '@angular/core';
import { ProjectCategoryService } from '../../../../services/admin/project-category.service';
import { ProjectCategory } from '../../../../models/admin/project-category';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-project-category-list',
    templateUrl: './project-category-list.component.html',
    styleUrls: ['./project-category-list.component.css'],
})
export class ProjectCategoryListComponent implements OnInit {
    categories: ProjectCategory[] = [];
    filteredCategories: ProjectCategory[] = [];
    type: string;
    typeLabel: string;

    // Search
    searchKeyword: string = '';

    // Pagination
    pageSize: number = 5;
    currentPage: number = 1;
    Math = Math; // Reference để dùng trong template

    get totalPages(): number {
        return Math.ceil(this.filteredCategories.length / this.pageSize);
    }

    get pagedCategories(): ProjectCategory[] {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredCategories.slice(start, end);
    }

    constructor(
        private categoryService: ProjectCategoryService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.type = params['type'];
            this.typeLabel = this.type === 'rent' ? 'cho thuê' : 'bán';
            this.searchKeyword = '';
            this.currentPage = 1;
            this.loadData();
        });
    }

    loadData() {
        // Mock data 8 danh mục để có phân trang
        this.categories = [
            { id: 1, name: 'Căn hộ ' + this.typeLabel, description: 'Dự án căn hộ ' + this.typeLabel, schema: [{}, {}, {}], type: this.type as any, projectCount: 12 },
            { id: 2, name: 'Nhà phố ' + this.typeLabel, description: 'Dự án nhà phố ' + this.typeLabel, schema: [{}, {}], type: this.type as any, projectCount: 5 },
            { id: 3, name: 'Biệt thự ' + this.typeLabel, description: 'Dự án biệt thự ' + this.typeLabel, schema: [{}, {}, {}, {}], type: this.type as any, projectCount: 8 },
            { id: 4, name: 'Đất nền ' + this.typeLabel, description: 'Dự án đất nền ' + this.typeLabel, schema: [{}], type: this.type as any, projectCount: 3 },
            { id: 5, name: 'Shophouse ' + this.typeLabel, description: 'Dự án shophouse ' + this.typeLabel, schema: [{}, {}], type: this.type as any, projectCount: 6 },
            { id: 6, name: 'Penthouse ' + this.typeLabel, description: 'Căn hộ penthouse ' + this.typeLabel, schema: [{}, {}, {}], type: this.type as any, projectCount: 2 },
        ] as any;

        this.applyFilter();
    }

    applyFilter() {
        if (this.searchKeyword.trim()) {
            const keyword = this.searchKeyword.toLowerCase().trim();
            this.filteredCategories = this.categories.filter(c =>
                c.name.toLowerCase().includes(keyword) ||
                c.description?.toLowerCase().includes(keyword)
            );
        } else {
            this.filteredCategories = [...this.categories];
        }
    }

    onSearch() {
        this.currentPage = 1;
        this.applyFilter();
    }

    clearSearch() {
        this.searchKeyword = '';
        this.currentPage = 1;
        this.applyFilter();
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    deleteCategory(id: number) {
        if (confirm('Bạn có chắc chắn muốn xóa category này?')) {
            this.categories = this.categories.filter(c => c.id !== id);
            this.applyFilter();
        }
    }
}
