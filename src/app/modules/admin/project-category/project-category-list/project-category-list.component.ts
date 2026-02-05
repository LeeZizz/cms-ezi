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
    type: string;
    typeLabel: string;

    constructor(
        private categoryService: ProjectCategoryService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.type = params['type'];
            this.typeLabel = this.type === 'rent' ? 'cho thuê' : 'bán';
            this.loadData();
        });
    }

    loadData() {
        // Mẫu dữ liệu giả để test giao diện khi chưa có BE
        this.categories = [
            { id: 1, name: 'Căn hộ ' + this.typeLabel, description: 'Dự án căn hộ ' + this.typeLabel, schema: [], type: this.type as any, projectCount: 12 },
            { id: 2, name: 'Nhà phố ' + this.typeLabel, description: 'Dự án nhà phố ' + this.typeLabel, schema: [], type: this.type as any, projectCount: 5 },
        ] as any;

        /* 
        this.categoryService.loadAll().subscribe(data => {
          this.categories = data;
        });
        */
    }

    deleteCategory(id: number) {
        if (confirm('Bạn có chắc chắn muốn xóa category này?')) {
            // Logic xóa
        }
    }
}
