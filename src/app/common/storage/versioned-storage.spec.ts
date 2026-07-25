import { VersionedStorage } from './versioned-storage';

class MemoryStorage implements Storage {
  private readonly store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

describe('VersionedStorage', () => {
  let memoryStorage: MemoryStorage;
  let versionedStorage: VersionedStorage;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-25T12:00:00.000Z'));
    memoryStorage = new MemoryStorage();
    versionedStorage = new VersionedStorage(memoryStorage, 'test');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stores and reads data by version', () => {
    versionedStorage.set('settings', 1, { language: 'es-MX' });

    expect(versionedStorage.get('settings', 1)).toEqual({ language: 'es-MX' });
  });

  it('removes data when the requested version changes', () => {
    versionedStorage.set('settings', 1, { language: 'es-MX' });

    expect(versionedStorage.get('settings', 2)).toBeNull();
    expect(memoryStorage.getItem('test:settings')).toBeNull();
  });

  it('expires data by ttl', () => {
    versionedStorage.set('session', 1, { token: 'abc' }, { ttlMs: 1000 });
    vi.setSystemTime(new Date('2026-07-25T12:00:01.001Z'));

    expect(versionedStorage.get('session', 1)).toBeNull();
  });

  it('prunes malformed and expired namespace entries', () => {
    memoryStorage.setItem('test:bad', '{bad json');
    memoryStorage.setItem(
      'test:old',
      JSON.stringify({ version: 1, expiresAt: '2026-07-25T11:59:59.000Z', data: true }),
    );
    memoryStorage.setItem('other:old', 'kept');

    versionedStorage.pruneExpired();

    expect(memoryStorage.getItem('test:bad')).toBeNull();
    expect(memoryStorage.getItem('test:old')).toBeNull();
    expect(memoryStorage.getItem('other:old')).toBe('kept');
  });
});
