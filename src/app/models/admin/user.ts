
export enum UserStatus {
    NOT_SYNCED = 'not_synced',
    SYNCED = 'synced',
    SYNC_ERROR = 'sync_error'
}

export enum SyncSource {
    EZI = 'ezi',
    FACEBOOK = 'facebook',
    GOOGLE = 'google',
    WEB = 'web' // Nguồn khác (website, hệ thống...)
}

export interface User {
    id: string;
    externalId: string;
    username: string; // Nametag
    email: string;
    phoneNumber?: string;
    fullName: string;
    avatarUrl?: string;

    // Project Stats
    projectCountRent: number;
    projectCountSale: number;

    // Admin managed
    status: UserStatus;
    notes?: string;

    // Metadata
    source: SyncSource;
    lastSyncedAt: Date;
    createdAt?: Date;
}
