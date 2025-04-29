import { Component, inject } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { MenuItem } from 'primeng/api';
import { ROTAS } from '../../const/rotas.const';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  rotas = ROTAS;
  jornadaStorage = inject(JornadaServiceService);
  itemsMenu: MenuItem[] = [
    {
      label: 'Minhas compras',
      icon: 'pi pi-fw pi-home',
      routerLink: ''
    },
    {
      label: 'Meu carrinho',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: '/carrinho',
      badge: this.quantidadeItensCarrinho?.toString(),
    },
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-sign-out',
      command: () => this.sair()
    }
  ];

  get quantidadeItensCarrinho() {
    return this.jornadaStorage.getQuantidadeCarrinho();
  }

  get usuarioLogado(){
    return this.jornadaStorage.getEstaLogado();
  }

  sair() {
    this.jornadaStorage.sair();
  }
}
