import { Component, inject } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { MenuItem } from 'primeng/api';
import { ROTAS } from '../../const/rotas.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  rotas = ROTAS;
  router = inject(Router);
  jornadaStorage = inject(JornadaServiceService);
  itemsMenu: MenuItem[] = [
    {
      label: 'Minhas compras',
      icon: 'pi pi-fw pi-shopping-bag',
      routerLink: this.rotas.MINHAS_COMPRAS
    },
    {
      label: 'Meu carrinho',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: this.rotas.CARRINHO,
      badge: this.quantidadeItensCarrinho?.toString(),
    },
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-sign-out',
      command: () => this.sair()
    }
  ];
  logoffMensagem = [];

  get quantidadeItensCarrinho() {
    return this.jornadaStorage.getQuantidadeCarrinho();
  }

  get usuarioLogado(){
    return this.jornadaStorage.getEstaLogado();
  }

  irParaHome() {
    this.router.navigate([ROTAS.HOME]);
  }

  sair() {
    this.logoffMensagem = [{severity: 'info', summary: 'Logoff realizado com sucesso! Realize o login para continuar as compras ou acompanhar os status.'}]
    this.jornadaStorage.sair();
  }
}
