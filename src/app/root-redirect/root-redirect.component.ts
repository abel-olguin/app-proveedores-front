import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_HOME_PATH, AUTH_SPLASH_PATH } from '../auth/services/auth-token.model';
import { AuthTokenService } from '../auth/services/auth-token.service';

@Component({
  selector: 'app-root-redirect',
  template: '',
})
export class RootRedirectComponent implements OnInit {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const nextPath = this.authTokenService.hasUsableToken() ? APP_HOME_PATH : AUTH_SPLASH_PATH;
    void this.router.navigateByUrl(nextPath);
  }
}
