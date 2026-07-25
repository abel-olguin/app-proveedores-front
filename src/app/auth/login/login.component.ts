import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-login',
  imports: [HlmButton, HlmInput, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected showPassword = false;

  constructor(private readonly location: Location) {}

  protected goBack(): void {
    this.location.back();
  }

  protected togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
