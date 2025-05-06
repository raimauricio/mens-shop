import { Component, OnInit, inject, Input } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { Router } from '@angular/router';
import { responsiveOptions } from '../../const/responsive-options.const';
import { IProduct } from '../../interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-panel',
  standalone: true,
  imports: [PrimeModule, FormsModule],
  templateUrl: './products-panel.component.html',
  styleUrl: './products-panel.component.scss',
})


export class ProductsPanelComponent {
  @Input() products: IProduct[];
  jornadaStorage = inject(JornadaServiceService);
  routes = inject(Router);
  message = inject(MessageService);
  confirmation = inject(ConfirmationService);
  responsiveOptions = responsiveOptions.productPanel;

  adicionarAoCarrinho(produto: IProduct, comprar = false) {
    if (produto.tamanhoSelecionado) {
      this.jornadaStorage.adicionarItemCarrinho(
        {...produto,tamanhoSelecionado: produto.tamanhoSelecionado}
      );
      this.message.add({
        severity: 'success',
        summary: 'Produto adicionado ao carrinho!',
        detail: `Produto ${produto.nome} adicionado com sucesso!`,
        life: 3000
      });
      if (comprar) {
        this.routes.navigate(['/carrinho']);
      }
    } else {
      this.confirmation.confirm({
        message: 'Selecione um tamanho para o produto!',
        header: 'Tamanho não selecionado',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Ok',
        acceptIcon: null,
        rejectVisible: false,
      });
    }
  }

  comprar(produto: IProduct) {
    this.adicionarAoCarrinho(produto, true);
  }

  montaOptions(tamanhos: string[]) {
    return tamanhos.map(tamanho => ({ name: tamanho, code: tamanho }));
  }
}
