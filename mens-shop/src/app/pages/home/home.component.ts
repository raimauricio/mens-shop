
import { Component, inject } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { ProductsPanelComponent } from '../../components/products-panel/products-panel.component';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BasePageComponent, ProductsPanelComponent, PrimeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  jornadaService = inject(JornadaServiceService);

  get estaLogado() {
    return this.jornadaService.getEstaLogado();
  }

  get nomeUsuario() {
    return this.jornadaService.getNomeUsuario();
  }
}
