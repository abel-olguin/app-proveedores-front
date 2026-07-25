import { Injectable } from '@angular/core';
import { VersionedStorage, VersionedStorageOptions } from './versioned-storage';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly storage = new VersionedStorage(localStorage);

  get<T>(key: string, version: number): T | null {
    return this.storage.get<T>(key, version);
  }

  set<T>(key: string, version: number, data: T, options?: VersionedStorageOptions): void {
    this.storage.set(key, version, data, options);
  }

  remove(key: string): void {
    this.storage.remove(key);
  }

  pruneExpired(): void {
    this.storage.pruneExpired();
  }
}
