import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SyncSource, User, UserStatus } from '../../../../models/admin/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  // Mock data
  private users: User[] = [
    {
      id: '1',
      externalId: 'ezi_001',
      username: 'thangld',
      email: 'thangld@ezi.vn',
      fullName: 'Lê Đức Thắng',
      avatarUrl: 'assets/images/alan.png',
      phoneNumber: '0909123456',
      projectCountRent: 5,
      projectCountSale: 2,
      status: UserStatus.SYNCED,
      source: SyncSource.EZI,
      lastSyncedAt: new Date('2026-02-10'),
      notes: 'Đây là khách hàng quan trọng, cần được quan tâm nhiều hơn'
    },
    {
      id: '2',
      externalId: 'ezi_002',
      username: 'minhqv',
      email: 'quangminh.vo@gmail.com',
      fullName: 'Võ Quang Minh',
      avatarUrl: 'assets/images/jack.png',
      phoneNumber: '0987654321',
      projectCountRent: 1,
      projectCountSale: 10,
      status: UserStatus.SYNCED,
      source: SyncSource.FACEBOOK,
      lastSyncedAt: new Date('2026-02-08')
    },
    {
      id: '3',
      externalId: 'ezi_003',
      username: 'chauvtm',
      email: 'chauvtm@gmail.com',
      fullName: 'Mai Châu Văn',
      avatarUrl: 'assets/images/kate.png',
      phoneNumber: '0911222333',
      projectCountRent: 8,
      projectCountSale: 0,
      status: UserStatus.NOT_SYNCED,
      source: SyncSource.GOOGLE,
      lastSyncedAt: new Date('2023-10-20'),
      notes: 'Spam tin đăng'
    },
    {
      id: '4',
      externalId: 'ezi_004',
      username: 'anhlt',
      email: 'anhlt.web@outlook.com',
      fullName: 'Lại Thế Anh',
      avatarUrl: 'assets/images/jack.png',
      phoneNumber: '0933444555',
      projectCountRent: 3,
      projectCountSale: 1,
      status: UserStatus.SYNCED,
      source: SyncSource.WEB,
      lastSyncedAt: new Date('2025-12-02'),
      notes: 'Manager nhóm dự án thuê'
    },
    {
      id: '5',
      externalId: 'ezi_005',
      username: 'linhpt',
      email: 'linhpt@ezi.vn',
      fullName: 'Phạm Thùy Linh',
      avatarUrl: 'assets/images/kate.png',
      phoneNumber: '0977001122',
      projectCountRent: 0,
      projectCountSale: 6,
      status: UserStatus.SYNCED,
      source: SyncSource.EZI,
      lastSyncedAt: new Date('2026-01-15'),
      notes: 'Chuyên sale, hay đăng dự án mới'
    },
    {
      id: '6',
      externalId: 'ezi_006',
      username: 'huynt',
      email: 'huynt@ezi.vn',
      fullName: 'Nguyễn Thành Huy',
      avatarUrl: 'assets/images/jack.png',
      phoneNumber: '0966123456',
      projectCountRent: 2,
      projectCountSale: 0,
      status: UserStatus.SYNC_ERROR,
      source: SyncSource.FACEBOOK,
      lastSyncedAt: new Date('2024-06-30'),
      notes: 'Bị khoá do đăng nội dung không hợp lệ'
    }
  ];


  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: string): Observable<User | undefined> {
    const user = this.users.find(u => u.id === id);
    return of(user);
  }

  updateStatus(id: string, status: UserStatus): Observable<boolean> {
    const user = this.users.find(u => u.id === id);
    if (user) {
      user.status = status;
      return of(true);
    }
    return of(false);
  }

  updateNotes(id: string, notes: string): Observable<boolean> {
    const user = this.users.find(u => u.id === id);
    if (user) {
      user.notes = notes;
      return of(true);
    }
    return of(false);
  }

  syncAll(): Observable<boolean> {
    // Simulate sync delay
    return of(true);
  }
}
