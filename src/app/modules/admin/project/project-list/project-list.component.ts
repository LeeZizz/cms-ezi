import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { Project, ProjectStatus } from '../../../../models/admin/project';

interface Category {
    id: number;
    name: string;
}

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
    type: 'rent' | 'sale' = 'rent';
    typeLabel: string = 'cho thuê';
    projects: Project[] = [];
    filteredProjects: Project[] = [];

    // Filter
    categories: Category[] = [];
    selectedCategoryId: number | null = null;

    // Status menu items
    statusMenuItems: NbMenuItem[] = [
        { title: 'Đang lên kế hoạch', data: 'planning' },
        { title: 'Bàn giao', data: 'handover' },
        { title: 'Hoàn thành', data: 'completed' },
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.type = params.get('type') as 'rent' | 'sale';
            this.typeLabel = this.type === 'rent' ? 'cho thuê' : 'bán';
            this.selectedCategoryId = null; // Reset filter khi chuyển type
            this.loadCategories();
            this.loadData();
        });
    }

    loadCategories() {
        // Mock data - danh sách danh mục
        this.categories = [
            { id: 1, name: 'Căn hộ ' + this.typeLabel },
            { id: 2, name: 'Nhà phố ' + this.typeLabel },
            { id: 3, name: 'Biệt thự ' + this.typeLabel },
        ];
    }

    loadData() {
        // Mock data cho UI testing
        this.projects = [
            {
                id: 1,
                name: 'Vinhomes Grand Park - Block S1',
                categoryId: 1,
                categoryName: 'Căn hộ ' + this.typeLabel,
                projectStatus: 'planning',
                data: { dientich: 75, gia: 15000000 },
            } as any,
            {
                id: 2,
                name: 'The Sun Avenue - Tầng 12',
                categoryId: 1,
                categoryName: 'Căn hộ ' + this.typeLabel,
                projectStatus: 'handover',
                data: { dientich: 68, gia: 12000000 },
            } as any,
            {
                id: 3,
                name: 'Nhà phố Quận 9 - 1 trệt 2 lầu',
                categoryId: 2,
                categoryName: 'Nhà phố ' + this.typeLabel,
                projectStatus: 'completed',
                data: { dientich: 120, gia: 25000000 },
            } as any,
            {
                id: 4,
                name: 'Biệt thự Thảo Điền',
                categoryId: 3,
                categoryName: 'Biệt thự ' + this.typeLabel,
                projectStatus: 'planning',
                data: { dientich: 500, gia: 80000000 },
            } as any,
        ];
        this.applyFilter();
    }

    applyFilter() {
        if (this.selectedCategoryId) {
            this.filteredProjects = this.projects.filter(p => p.categoryId === this.selectedCategoryId);
        } else {
            this.filteredProjects = [...this.projects];
        }
    }

    onCategoryFilterChange() {
        this.applyFilter();
    }

    getStatusBadge(status: string): string {
        switch (status) {
            case 'planning': return 'warning';
            case 'handover': return 'info';
            case 'completed': return 'success';
            default: return 'basic';
        }
    }

    getStatusLabel(status: string): string {
        switch (status) {
            case 'planning': return 'Đang lên kế hoạch';
            case 'handover': return 'Bàn giao';
            case 'completed': return 'Hoàn thành';
            default: return status;
        }
    }

    deleteProject(id: number) {
        if (confirm('Bạn có chắc muốn xóa dự án này?')) {
            this.projects = this.projects.filter(p => p.id !== id);
            this.applyFilter();
        }
    }

    onStatusChange(event: { item: NbMenuItem }, project: any) {
        const newStatus = event.item.data as ProjectStatus;
        project.projectStatus = newStatus;
        // TODO: Gọi API để lưu trạng thái mới
        console.log(`Đã đổi trạng thái dự án ${project.id} thành: ${newStatus}`);
    }
}
