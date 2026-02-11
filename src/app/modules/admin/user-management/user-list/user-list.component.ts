import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { SyncSource, User, UserStatus } from '../../../../models/admin/user';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];

  // Search & Filter
  searchKeyword: string = '';
  selectedStatus: UserStatus | 'all' = 'all';

  // Pagination
  pageSize: number = 5;
  currentPage: number = 1;
  protected readonly Math = Math;


  // Loading state
  isLoading = false;
  isSyncing = false;

  constructor(
    private userService: UserManagementService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.applyFilter();
      this.isLoading = false;
    });
  }

  applyFilter() {
    let result = [...this.users];

    // Filter by Status
    if (this.selectedStatus !== 'all') {
      result = result.filter(u => u.status === this.selectedStatus);
    }

    // Search by keyword
    if (this.searchKeyword.trim()) {
      const keyword = this.searchKeyword.toLowerCase().trim();
      result = result.filter(u =>
        u.fullName.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword) ||
        (u.phoneNumber && u.phoneNumber.includes(keyword)) ||
        u.username.toLowerCase().includes(keyword)
      );
    }

    this.filteredUsers = result;
    this.currentPage = 1;
  }

  get pagedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredUsers.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onSearch() {
    this.applyFilter();
  }

  onFilterChange() {
    this.applyFilter();
  }

  clearSearch() {
    this.searchKeyword = '';
    this.applyFilter();
  }

  syncAll() {
    this.isSyncing = true;
    this.userService.syncAll().subscribe(() => {
      setTimeout(() => {
        this.isSyncing = false;
        this.toastr.success('Đồng bộ thành công!', 'Thông báo');
        this.loadUsers();
      }, 1500);
    });
  }



  // New logic: Use distinct Ezi icon (or placeholder image/icon)
  isEziSource(source: SyncSource): boolean {
    return source === SyncSource.EZI;
  }
}
