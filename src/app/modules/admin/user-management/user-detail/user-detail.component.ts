import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { SyncSource, User, UserStatus } from '../../../../models/admin/user';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  projects: any[] = []; // Current displayed projects (filtered)
  allProjects: any[] = []; // All projects of user
  projectCategories: string[] = [];
  selectedCategory: string = 'All'; // 'All' or specific category name
  isLoading = false;
  isSaving = false;

  // Editable fields
  editNotes: string = '';

  // Pagination
  pageSize: number = 5;
  currentPage: number = 1;
  protected readonly Math = Math;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserManagementService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(id);
    } else {
      this.toastr.danger('Không tìm thấy ID user', 'Lỗi');
      this.goBack();
    }
  }

  loadUser(id: string) {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe(u => {
      this.isLoading = false;
      if (u) {
        this.user = u;
        this.editNotes = u.notes || '';
        this.loadProjects(u.username);
      } else {
        this.toastr.warning('Không tìm thấy user', 'Cảnh báo');
        this.goBack();
      }
    });
  }

  loadProjects(username: string) {
    // Mock project data
    const allProjectsData = [
      {
        id: 1,
        name: 'Vinhomes Grand Park - Block S1',
        categoryName: 'Căn hộ cho thuê',
        projectStatus: 'planning',
        ownerName: 'thangld',
        createdAt: new Date('2023-01-15')
      },
      {
        id: 2,
        name: 'The Sun Avenue - Tầng 12',
        categoryName: 'Căn hộ cho thuê',
        projectStatus: 'handover',
        ownerName: 'minhqv',
        createdAt: new Date('2023-02-20')
      },
      {
        id: 3,
        name: 'Nhà phố Quận 9 - 1 trệt 2 lầu',
        categoryName: 'Nhà phố cho thuê',
        projectStatus: 'completed',
        ownerName: 'chauvtm',
        createdAt: new Date('2023-03-10')
      },
      {
        id: 5,
        name: 'Masteri Thảo Điền - Block A',
        categoryName: 'Căn hộ cho thuê',
        projectStatus: 'completed',
        ownerName: 'huonglt',
        createdAt: new Date('2023-05-05')
      },
      {
        id: 8,
        name: 'Saigon Pearl - Tầng 25',
        categoryName: 'Căn hộ bán',
        projectStatus: 'planning',
        ownerName: 'minhqv',
        createdAt: new Date('2023-08-12')
      },
      { // Mock for current user if not found above
        id: 98,
        name: 'Dự án 1 ' + username,
        categoryName: 'Căn hộ Demo',
        projectStatus: 'planning',
        ownerName: username,
        createdAt: new Date()
      },
      { // Mock for current user if not found above
        id: 99,
        name: 'Dự án mẫu của ' + username,
        categoryName: 'Căn hộ Demo',
        projectStatus: 'planning',
        ownerName: username,
        createdAt: new Date()
      },
      { // Mock for current user if not found above
        id: 97,
        name: 'Dự án 3 ' + username,
        categoryName: 'Căn hộ Demo',
        projectStatus: 'planning',
        ownerName: username,
        createdAt: new Date()
      },
      { // Mock for current user if not found above
        id: 96,
        name: 'Dự án mẫu của 1 ' + username,
        categoryName: 'Căn hộ Demo',
        projectStatus: 'planning',
        ownerName: username,
        createdAt: new Date()
      },
      { // Mock for current user if not found above
        id: 95,
        name: 'Dự án 7' + username,
        categoryName: 'Căn hộ Demo',
        projectStatus: 'planning',
        ownerName: username,
        createdAt: new Date()
      },
      { // Mock for current user if not found above
        id: 94,
        name: 'Dự án mẫu của 4 ' + username,
        categoryName: 'Căn hộ Demo',
        projectStatus: 'planning',
        ownerName: username,
        createdAt: new Date()
      }
    ];

    this.allProjects = allProjectsData.filter(p => p.ownerName === username);

    // Extract unique categories
    const categories = new Set(this.allProjects.map(p => p.categoryName));
    this.projectCategories = Array.from(categories);

    // Initial filter
    this.filterProjects();
  }

  save() {
    if (!this.user) return;

    this.isSaving = true;

    // Call service to update
    this.userService.updateNotes(this.user.id, this.editNotes).subscribe(notesSuccess => {
      this.isSaving = false;

      if (notesSuccess) {
        // Silent success or small toast
        // this.toastr.success('Đã lưu ghi chú', 'Thành công');
        this.user!.notes = this.editNotes;
      } else {
        this.toastr.danger('Có lỗi xảy ra khi lưu ghi chú', 'Lỗi');
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/users']);
  }

  searchQuery: string = '';

  filterProjects() {
    this.currentPage = 1; // Reset to first page

    let filtered = this.allProjects;

    // Filter by Category
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.categoryName === this.selectedCategory);
    }

    // Filter by Search Query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.id.toString().includes(query)
      );
    }

    this.projects = filtered;
  }

  // New logic: Use distinct Ezi icon (or placeholder image/icon)
  isEziSource(source: SyncSource | undefined): boolean {
    return source === SyncSource.EZI;
  }

  get pagedProjects(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.projects.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.projects.length / this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}
