
import { Component } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { ProductsPanelComponent } from '../../components/products-panel/products-panel.component';
import { PrimeModule } from '../../shared/prime-module/prime.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BasePageComponent, ProductsPanelComponent, PrimeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  text = '';
}
