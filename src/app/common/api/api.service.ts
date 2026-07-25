import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.tokens';

export type ApiQueryParams = Record<string, string | number | boolean | null | undefined>;

export interface ApiRequestOptions {
  context?: HttpContext;
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: ApiQueryParams;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  get<T>(path: string, options: ApiRequestOptions = {}): Observable<T> {
    return this.httpClient.get<T>(this.resolveUrl(path), this.resolveOptions(options));
  }

  post<T, TBody = unknown>(path: string, body: TBody, options: ApiRequestOptions = {}): Observable<T> {
    return this.httpClient.post<T>(this.resolveUrl(path), body, this.resolveOptions(options));
  }

  put<T, TBody = unknown>(path: string, body: TBody, options: ApiRequestOptions = {}): Observable<T> {
    return this.httpClient.put<T>(this.resolveUrl(path), body, this.resolveOptions(options));
  }

  delete<T>(path: string, options: ApiRequestOptions = {}): Observable<T> {
    return this.httpClient.delete<T>(this.resolveUrl(path), this.resolveOptions(options));
  }

  private resolveUrl(path: string): string {
    if (/^https?:\/\//.test(path)) {
      return path;
    }

    const normalizedBase = this.apiBaseUrl.replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${normalizedBase}${normalizedPath}`;
  }

  private resolveOptions(options: ApiRequestOptions): {
    context?: HttpContext;
    headers: HttpHeaders | Record<string, string | string[]>;
    params?: HttpParams;
  } {
    return {
      context: options.context,
      headers: options.headers ?? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: this.resolveParams(options.params),
    };
  }

  private resolveParams(params?: ApiQueryParams): HttpParams | undefined {
    if (!params) {
      return undefined;
    }

    return Object.entries(params).reduce((httpParams, [key, value]) => {
      if (value === null || value === undefined) {
        return httpParams;
      }

      return httpParams.set(key, String(value));
    }, new HttpParams());
  }
}
