import { Component, inject, OnInit } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResumeCartComponent } from '../../components/resume-cart/resume-cart.component';
import { DeliveryComponent } from '../../components/delivery/delivery.component';
import { PaymentComponent } from '../../components/payment/payment.component';
import { ROTAS } from '../../const/rotas.const';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { Router } from '@angular/router';
import { CompraService } from '../../services/compra/compra.service';
import { ConfirmationService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

interface ICheckoutStep {
  nextStepLabel: string;
  previousStepLabel: string;
  validityCheck: boolean;
  nextAction: Function;
  previousAction: Function;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ResumeCartComponent,
    PrimeModule,
    ReactiveFormsModule,
    BasePageComponent,
    DeliveryComponent,
    PaymentComponent,
    HttpClientModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  providers: [CompraService]
})
export class CheckoutComponent implements OnInit{
  jornadaService = inject(JornadaServiceService);
  router = inject(Router);
  compraService = inject(CompraService);
  confirmationService = inject(ConfirmationService);
  formaRecebimentoAdicionada = false;
  formaPagamentoAdicionada = false;

  rotas = ROTAS;

  stepCheckout = 1;

  ngOnInit(): void {
    this.validaUsuarioLogado();
  }

  get stepData(): ICheckoutStep{
    switch (this.stepCheckout) {
      case 1:
        return {
          nextStepLabel: 'Ir para forma de pagamento',
          previousStepLabel: 'Voltar para o carrinho',
          validityCheck: !this.formaRecebimentoAdicionada,
          previousAction: () => this.router.navigate([this.rotas.CARRINHO]),
          nextAction: () => this.stepCheckout = 2
        }
      case 2:
        return {
          nextStepLabel: 'Ir para revisão de compra',
          previousStepLabel: 'Revisar dados de entrega',
          validityCheck: !this.formaPagamentoAdicionada,
          previousAction: () => this.stepCheckout = 1,
          nextAction: () => this.stepCheckout = 3
        }
      case 3:
        return {
          nextStepLabel: 'Finalizar compra',
          previousStepLabel: 'Revisar forma de pagamento',
          validityCheck: false,
          previousAction: () => this.stepCheckout = 2,
          nextAction: () => this.finalizarCompra()
        }
      default:
        return {
          nextStepLabel: '',
          previousStepLabel: '',
          validityCheck: false,
          previousAction: () => {},
          nextAction: () => {}
        };
    }
  }

  finalizarCompra() {
    this.compraService.compra()
      .subscribe(
        {
          next: (response) => {
            this.jornadaService.finalizarPedido();
            this.confirmationService.confirm({
              header: response.titulo,
              message: response.mensagem,
              acceptLabel: '  Acompanhar compra',
              accept: () => { this.router.navigate([ROTAS.MINHAS_COMPRAS])},
              rejectLabel: '  Voltar para loja',
              reject: () => { this.router.navigate([ROTAS.HOME])}
            });
          },
          error: () =>  {
            this.confirmationService.confirm({
              header: 'Não foi possível finalizar a compra.',
              message: 'Erro durante a finalização da compra, por favor tente novamente mais tarde.',
              acceptLabel: '  Tentar novamente',
              accept: () => { setTimeout(() =>{ this.finalizarCompra() }, 1000)  },
              rejectLabel: '  Voltar para loja',
              reject: () => { this.router.navigate([ROTAS.HOME])}
            });
          }
        }
      );

  }

  validaUsuarioLogado() {
    if(!this.jornadaService.getEstaLogado() || this.jornadaService.getQuantidadeCarrinho() === 0) {
      this.router.navigate([this.rotas.LOGIN]);
    }
    this.jornadaService.setAdicionarProdutosCompra();
  }

  recebeFormarecebimento(event: boolean) {
    this.formaRecebimentoAdicionada = event;
  }

  recebeFormaPagamento(event: boolean) {
    this.formaPagamentoAdicionada = event;
  }
}
