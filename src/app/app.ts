import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import { UserSettingsService } from './common/settings/user-settings.service';

@Component({
  selector: 'app-root',
  imports: [HlmToaster, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(protected readonly userSettingsService: UserSettingsService) {}
}
