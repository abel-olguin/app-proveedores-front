import { HttpContext, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { API_BASE_URL } from '../../common/api/api.tokens';
import { ApiService } from '../../common/api/api.service';
import { AuthTokenService } from '../services/auth-token.service';
import { SKIP_AUTH_HEADER, SKIP_AUTH_REDIRECT } from './auth-http-context';
import { authApiInterceptor } from './auth-api.interceptor';

describe('authApiInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let apiService: ApiService;
  let navigateByUrl: ReturnType<typeof vi.fn>;
  let getToken: ReturnType<typeof vi.fn>;
  let clearToken: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    navigateByUrl = vi.fn();
    getToken = vi.fn();
    clearToken = vi.fn();
    vi.spyOn(toast, 'error').mockImplementation(() => 'toast-id');
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authApiInterceptor])),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
        { provide: Router, useValue: { navigateByUrl } },
        { provide: AuthTokenService, useValue: { getToken, clearToken } },
      ],
    });
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.restoreAllMocks();
  });

  it('adds bearer token to api requests', () => {
    getToken.mockReturnValue('token-1');

    apiService.get('/users').subscribe();

    const request = httpTestingController.expectOne('/api/users');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-1');
    request.flush({});
  });

  it('redirects api requests without token', () => {
    getToken.mockReturnValue(null);

    apiService.get('/users').subscribe({
      error: (error) => expect(error.status).toBe(401),
    });

    expect(navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });

  it('can skip auth header and redirect', () => {
    getToken.mockReturnValue(null);

    apiService
      .get('/public', {
        context: new HttpContext().set(SKIP_AUTH_HEADER, true).set(SKIP_AUTH_REDIRECT, true),
      })
      .subscribe();

    const request = httpTestingController.expectOne('/api/public');
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });

  it('shows toast and clears token on unauthorized api errors', () => {
    getToken.mockReturnValue('token-1');

    apiService.get('/users').subscribe({ error: () => undefined });

    httpTestingController.expectOne('/api/users').flush({ message: 'No autorizado' }, { status: 401, statusText: 'Unauthorized' });
    expect(toast.error).toHaveBeenCalled();
    expect(clearToken).toHaveBeenCalled();
    expect(navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});
