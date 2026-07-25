import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../../common/storage/local-storage.service';
import { AUTH_TOKEN_STORAGE_KEY, AUTH_TOKEN_VERSION } from './auth-token.model';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private readonly jwtHelper = new JwtHelperService();

  constructor(private readonly localStorageService: LocalStorageService) {}

  getToken(): string | null {
    return this.localStorageService.get<string>(AUTH_TOKEN_STORAGE_KEY, AUTH_TOKEN_VERSION);
  }

  setToken(token: string): void {
    this.localStorageService.set(AUTH_TOKEN_STORAGE_KEY, AUTH_TOKEN_VERSION, token, {
      expiresAt: null,
    });
  }

  clearToken(): void {
    this.localStorageService.remove(AUTH_TOKEN_STORAGE_KEY);
  }

  hasUsableToken(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const isExpired = this.jwtHelper.isTokenExpired(token);

      if (isExpired) {
        this.clearToken();
      }

      return !isExpired;
    } catch {
      this.clearToken();
      return false;
    }
  }
}
