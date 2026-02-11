
export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BLOCKED = 'blocked',
    SYNC_ERROR = 'sync_error'
}

export enum SyncSource {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    SYSTEM = 'system',
    ZALO = 'zalo',
    EZI = 'ezi' // Ezi Solution (Web)
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
}
