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

    // Filter & Search
    categories: Category[] = [];
    selectedCategoryId: number | null = null;
    owners: string[] = [];
    filteredOwners: string[] = [];
    selectedOwner: string | null = null;
    searchKeyword: string = '';

    // Pagination
    pageSize: number = 5;
    currentPage: number = 1;
    Math = Math; // Reference để dùng trong template

    get totalPages(): number {
        return Math.ceil(this.filteredProjects.length / this.pageSize);
    }

    get pagedProjects(): Project[] {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredProjects.slice(start, end);
    }

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
            this.selectedOwner = null;
            this.searchKeyword = '';
            this.currentPage = 1;
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
        // Mock data cho UI testing - 8 dự án để có phân trang
        this.projects = [
            {
                id: 1,
                name: 'Vinhomes Grand Park - Block S1',
                categoryId: 1,
                categoryName: 'Căn hộ ' + this.typeLabel,
                projectStatus: 'planning',
                data: { dientich: 75, gia: 15000000 },
                ownerName: 'thangld',
            } as any,
            {
                id: 2,
                name: 'The Sun Avenue - Tầng 12',
                categoryId: 1,
                categoryName: 'Căn hộ ' + this.typeLabel,
                projectStatus: 'handover',
                data: { dientich: 68, gia: 12000000 },
                ownerName: 'minhqv',
            } as any,
            {
                id: 3,
                name: 'Nhà phố Quận 9 - 1 trệt 2 lầu',
                categoryId: 2,
                categoryName: 'Nhà phố ' + this.typeLabel,
                projectStatus: 'completed',
                data: { dientich: 120, gia: 25000000 },
                ownerName: 'chauvtm',
            } as any,
            {
                id: 4,
                name: 'Biệt thự Thảo Điền',
                categoryId: 3,
                categoryName: 'Biệt thự ' + this.typeLabel,
                projectStatus: 'planning',
                data: { dientich: 500, gia: 80000000 },
                ownerName: 'anhlt',
            } as any,
            {
                id: 5,
                name: 'Masteri Thảo Điền - Block A',
                categoryId: 1,
                categoryName: 'Căn hộ ' + this.typeLabel,
                projectStatus: 'completed',
                data: { dientich: 90, gia: 18000000 },
                ownerName: 'huonglt',
            } as any,
            {
                id: 6,
                name: 'Nhà phố Thủ Đức - 3 tầng',
                categoryId: 2,
                categoryName: 'Nhà phố ' + this.typeLabel,
                projectStatus: 'handover',
                data: { dientich: 150, gia: 30000000 },
                ownerName: 'chauvtm',
            } as any,
            {
                id: 7,
                name: 'Biệt thự Phú Mỹ Hưng',
                categoryId: 3,
                categoryName: 'Biệt thự ' + this.typeLabel,
                projectStatus: 'completed',
                data: { dientich: 400, gia: 65000000 },
                ownerName: 'anhlt',
            } as any,
            {
                id: 8,
                name: 'Saigon Pearl - Tầng 25',
                categoryId: 1,
                categoryName: 'Căn hộ ' + this.typeLabel,
                projectStatus: 'planning',
                data: { dientich: 85, gia: 20000000 },
                ownerName: 'minhqv',
            } as any,
        ];

        // Lấy danh sách owner duy nhất
        this.owners = [...new Set(this.projects.map(p => p.ownerName).filter(name => !!name))] as string[];
        this.filteredOwners = [...this.owners];

        this.applyFilter();
    }

    applyFilter() {
        let result = [...this.projects];

        // Lọc theo danh mục
        if (this.selectedCategoryId) {
            result = result.filter(p => p.categoryId === this.selectedCategoryId);
        }

        // Lọc theo chủ sở hữu
        if (this.selectedOwner) {
            result = result.filter(p => p.ownerName === this.selectedOwner);
        }

        // Lọc theo từ khóa tìm kiếm
        if (this.searchKeyword.trim()) {
            const keyword = this.searchKeyword.toLowerCase().trim();
            result = result.filter(p =>
                p.name.toLowerCase().includes(keyword) ||
                p.categoryName?.toLowerCase().includes(keyword) ||
                p.ownerName?.toLowerCase().includes(keyword)
            );
        }

        this.filteredProjects = result;
    }

    onCategoryFilterChange() {
        this.currentPage = 1;
        this.applyFilter();
    }

    onOwnerFilterChange() {
        this.currentPage = 1;
        this.applyFilter();
    }

    onSearch() {
        this.currentPage = 1;
        this.applyFilter();
    }

    handleOwnerSearch(event: any) {
        event.stopPropagation(); // Ngăn chặn sự kiện lan truyền
        const keyword = event.target.value.toLowerCase();
        this.filteredOwners = this.owners.filter(o => o.toLowerCase().includes(keyword));
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
