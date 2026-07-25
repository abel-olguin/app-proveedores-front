import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, HlmButton],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Servicios');
  protected readonly shieldIcon = faShieldHalved;
  protected readonly readinessItems = [
    'Angular 22 inicializado',
    'Spartan UI activo',
    'Font Awesome Angular cargado',
    'Robots y llms bloquean crawling',
  ];
}
