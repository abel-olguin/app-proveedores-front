import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-start',
  imports: [HlmButton, RouterLink, TranslatePipe],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent {}
