import { Component, inject, Input, OnInit } from '@angular/core';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { IItemCarrinho } from '../../interfaces/product.interface';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { IPagamento, IRecebimento } from '../../interfaces/compra.interface';
import { Lojas } from '../../const/lojas.const';

@Component({
  selector: 'app-resume-cart',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './resume-cart.component.html',
  styleUrl: './resume-cart.component.scss'
})
export class ResumeCartComponent implements OnInit {
  @Input() stepCheckout = 1;
  carrinhoDeCompras: IItemCarrinho[];
  jornadaService = inject(JornadaServiceService);

  get dadosPagamento(): IPagamento{
    return this.jornadaService.getDadosResumoCompra().pagamento;
  }

  get dadosRecebimento(): IRecebimento{
    return this.jornadaService.getDadosResumoCompra().recebimento;
  }

  get loja () {
    const lojas = Lojas;
    return lojas.find(loja => loja.id === this.jornadaService.getDadosResumoCompra().recebimento.retiradaLoja);
  }

  ngOnInit(): void {
    this.carrinhoDeCompras = this.jornadaService.getMontaCarrinho();
  }

  getTotal() {
    return this.jornadaService.getValorTotalCompras();
  }
}
