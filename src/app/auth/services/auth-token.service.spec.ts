import { TestBed } from '@angular/core/testing';
import { AuthTokenService } from './auth-token.service';

function createJwt(expirationSecondsFromEpoch: number): string {
  const payload = btoa(JSON.stringify({ exp: expirationSecondsFromEpoch }))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');

  return `header.${payload}.signature`;
}

describe('AuthTokenService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-25T12:00:00.000Z'));
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stores auth_token as v1 without expiration', () => {
    const service = TestBed.inject(AuthTokenService);

    service.setToken(createJwt(1800000000));

    expect(service.getToken()).toBeTruthy();
    expect(localStorage.getItem('servicios:auth_token')).toContain('"expiresAt":null');
  });

  it('clears expired tokens', () => {
    const service = TestBed.inject(AuthTokenService);
    service.setToken(createJwt(1));

    expect(service.hasUsableToken()).toBe(false);
    expect(service.getToken()).toBeNull();
  });

  it('accepts non-expired tokens', () => {
    const service = TestBed.inject(AuthTokenService);
    service.setToken(createJwt(1800000000));

    expect(service.hasUsableToken()).toBe(true);
  });
});
