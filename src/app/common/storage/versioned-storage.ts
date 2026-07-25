export interface VersionedStorageEnvelope<T> {
  version: number;
  expiresAt: string | null;
  data: T;
}

export interface VersionedStorageOptions {
  expiresAt?: Date | string | number | null;
  ttlMs?: number;
}

export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem' | 'key'> & {
  readonly length: number;
};

export class VersionedStorage {
  constructor(
    private readonly storage: StorageLike,
    private readonly namespace = 'servicios',
  ) {}

  get<T>(key: string, version: number): T | null {
    const stored = this.readEnvelope<T>(key);

    if (!stored) {
      return null;
    }

    if (stored.version !== version || this.isExpired(stored)) {
      this.remove(key);
      return null;
    }

    return stored.data;
  }

  set<T>(key: string, version: number, data: T, options: VersionedStorageOptions = {}): void {
    this.pruneOtherVersions(key, version);

    const envelope: VersionedStorageEnvelope<T> = {
      version,
      expiresAt: this.resolveExpiration(options),
      data,
    };

    this.storage.setItem(this.resolveKey(key), JSON.stringify(envelope));
  }

  remove(key: string): void {
    this.storage.removeItem(this.resolveKey(key));
  }

  pruneExpired(): void {
    this.keys().forEach((storageKey) => {
      const rawValue = this.storage.getItem(storageKey);

      if (!rawValue) {
        return;
      }

      try {
        const envelope = JSON.parse(rawValue) as VersionedStorageEnvelope<unknown>;

        if (this.isExpired(envelope)) {
          this.storage.removeItem(storageKey);
        }
      } catch {
        this.storage.removeItem(storageKey);
      }
    });
  }

  private readEnvelope<T>(key: string): VersionedStorageEnvelope<T> | null {
    const rawValue = this.storage.getItem(this.resolveKey(key));

    if (!rawValue) {
      return null;
    }

    try {
      return JSON.parse(rawValue) as VersionedStorageEnvelope<T>;
    } catch {
      this.remove(key);
      return null;
    }
  }

  private pruneOtherVersions(key: string, version: number): void {
    const versionedPrefix = `${this.namespace}:${key}:`;
    const legacyPrefix = `${this.namespace}:v`;

    this.keys().forEach((storageKey) => {
      const isLegacyKey =
        storageKey.startsWith(legacyPrefix) && storageKey.endsWith(`:${key}`) && storageKey !== this.resolveKey(key);
      const isAlternateVersionKey =
        storageKey.startsWith(versionedPrefix) && storageKey !== `${versionedPrefix}v${version}`;

      if (isLegacyKey || isAlternateVersionKey) {
        this.storage.removeItem(storageKey);
      }
    });
  }

  private resolveExpiration(options: VersionedStorageOptions): string | null {
    if (options.expiresAt === null) {
      return null;
    }

    if (options.expiresAt instanceof Date) {
      return options.expiresAt.toISOString();
    }

    if (typeof options.expiresAt === 'string') {
      return new Date(options.expiresAt).toISOString();
    }

    if (typeof options.expiresAt === 'number') {
      return new Date(options.expiresAt).toISOString();
    }

    if (typeof options.ttlMs === 'number') {
      return new Date(Date.now() + options.ttlMs).toISOString();
    }

    return null;
  }

  private isExpired(envelope: VersionedStorageEnvelope<unknown>): boolean {
    if (!envelope.expiresAt) {
      return false;
    }

    return Date.parse(envelope.expiresAt) <= Date.now();
  }

  private keys(): string[] {
    return Array.from({ length: this.storage.length }, (_, index) => this.storage.key(index)).filter(
      (key): key is string => !!key && key.startsWith(`${this.namespace}:`),
    );
  }

  private resolveKey(key: string): string {
    return `${this.namespace}:${key}`;
  }
}
