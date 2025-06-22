import { Component, inject } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { MenuItem } from 'primeng/api';
import { ROTAS } from '../../const/rotas.const';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimeModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [UsuarioService]
})
export class HeaderComponent {
  rotas = ROTAS;
  router = inject(Router);
  jornadaStorage = inject(JornadaServiceService);
  usuarioService = inject(UsuarioService);
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

  get logoffMensagem (): {severity: string, summary: string}[]{
    return this.jornadaStorage.logoffMensagem.getValue();
  };

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
    const requestBody = {
      endereco: this.jornadaStorage.getCompra()?.recebimento?.endereco ?? null,
      cartao:  this.jornadaStorage.getCompra()?.pagamento?.cartao ?? null,
      carrinho: this.jornadaStorage.getItensCarrinho()?.length ? this.jornadaStorage.getMontaCarrinho().map(item => ({
        produtoId: item?.produto.id,
        quantidade: item?.quantidade,
        tamanhoSelecionado: item?.tamanhoSelecionado,
      })) : null,
    }
    this.usuarioService.atualizarUsuario(requestBody)
      .pipe(
        finalize(() => {
          this.router.navigate([ROTAS.HOME]);
          this.jornadaStorage.sair();
        })
      )
      .subscribe({
        next: () => {
          this.jornadaStorage
            .logoffMensagem.next([
              {
                severity: 'info',
                summary: 'Logoff realizado com sucesso! Realize o login para continuar as compras ou acompanhar os status.'
              }
            ]);
        },
        error: () => {
          this.jornadaStorage
            .logoffMensagem.next([
              {
                severity: 'info',
                summary: 'Nao foi possível atualizar as suas informações! Realize o login para continuar as compras ou acompanhar os status.'
              }
            ]);
        }
      });
  }
}
