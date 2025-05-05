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
    PaymentComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  formaRecebimentoAdicionada = false;
  formaPagamentoAdicionada = false;
  jornadaService = inject(JornadaServiceService);
  rotas = ROTAS;
  router = inject(Router);
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
    console.log('Compra finalizada!');
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
