import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../../models/admin/project';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
    type: 'rent' | 'sale' = 'rent';
    typeLabel: string = 'cho thuê';
    projects: Project[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.type = params.get('type') as 'rent' | 'sale';
            this.typeLabel = this.type === 'rent' ? 'cho thuê' : 'bán';
            this.loadData();
        });
    }

    loadData() {
        // Mock data cho UI testing
        this.projects = [
            {
                id: 1,
                name: 'Vinhomes Grand Park - Block S1',
                categoryId: 1,
                categoryName: 'Căn hộ ' + this.typeLabel,
                status: 'published',
                data: { dientich: 75, gia: 15000000 },
            } as any,
            {
                id: 2,
                name: 'The Sun Avenue - Tầng 12',
                categoryId: 1,
                categoryName: 'Căn hộ ' + this.typeLabel,
                status: 'draft',
                data: { dientich: 68, gia: 12000000 },
            } as any,
            {
                id: 3,
                name: 'Nhà phố Quận 9 - 1 trệt 2 lầu',
                categoryId: 2,
                categoryName: 'Nhà phố ' + this.typeLabel,
                status: 'published',
                data: { dientich: 120, gia: 25000000 },
            } as any,
        ];
    }

    getStatusBadge(status: string): string {
        return status === 'published' ? 'success' : 'warning';
    }

    getStatusLabel(status: string): string {
        return status === 'published' ? 'Đã đăng' : 'Nháp';
    }

    deleteProject(id: number) {
        if (confirm('Bạn có chắc muốn xóa dự án này?')) {
            this.projects = this.projects.filter(p => p.id !== id);
        }
    }
}
