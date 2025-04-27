import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeModule } from './shared/prime-module/prime.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mens-shop';
}
