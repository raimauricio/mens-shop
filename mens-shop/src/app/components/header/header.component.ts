import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  itensCarrinho = null;
  isLoggedIn = false;

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
