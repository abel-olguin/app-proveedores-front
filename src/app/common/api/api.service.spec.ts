import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api.tokens';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
      ],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('sends get requests with serialized params', () => {
    service.get('/users', { params: { page: 1, empty: null } }).subscribe();

    const request = httpTestingController.expectOne('/api/users?page=1');
    expect(request.request.method).toBe('GET');
    request.flush({});
  });

  it('sends post, put and delete requests', () => {
    service.post('/users', { name: 'Ana' }).subscribe();
    httpTestingController.expectOne('/api/users').flush({});

    service.put('/users/1', { name: 'Ana' }).subscribe();
    httpTestingController.expectOne('/api/users/1').flush({});

    service.delete('/users/1').subscribe();
    httpTestingController.expectOne('/api/users/1').flush({});
  });
});
