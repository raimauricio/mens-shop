import { Component, inject } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  itensCarrinho = null;
  isLoggedIn = false;
  jornadaStorage = inject(JornadaServiceService);

  get quantidadeItensCarrinho() {
    return this.jornadaStorage.getQuantidadeCarrinho();
  }

  get usuarioLogado(){
    return this.jornadaStorage.getEstaLogado();
  }

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
