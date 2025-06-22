import { Component, inject, OnInit } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { IPedido } from '../../interfaces/pedido.interface';
import { Router } from '@angular/router';
import { ROTAS } from '../../const/rotas.const';
import { CompraService } from '../../services/compra/compra.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-my-shopping',
  standalone: true,
  imports: [PrimeModule, BasePageComponent, HttpClientModule],
  templateUrl: './my-shopping.component.html',
  styleUrl: './my-shopping.component.scss',
  providers: [CompraService]
})
export class MyShoppingComponent implements OnInit{
  jornadaStorage = inject(JornadaServiceService);
  compraService = inject(CompraService);
  router = inject(Router);
  pedidos: IPedido[] = [];

  ngOnInit(): void {
    if(!this.jornadaStorage.getEstaLogado())
      this.router.navigate([ROTAS.HOME]);
    this.buscarCompras();
  }

  buscarCompras() {
    this.compraService.minhasCompras().subscribe({
      next: (response: IPedido[]) => {
        this.pedidos = response;
      }
    });
  }

  getStatusColor(status: string): 'info' | 'success' | 'warning' | 'danger' {
    switch (status) {
      case 'Pagamento processado':
        return 'info';
      case 'Separando pedido':
      case 'Pedido em processamento':
      case 'A caminho da entrega':
        return 'warning';
      case 'Disponível para retirada':
      case 'Entregue':
      case 'Retirado':
        return 'success';
      default:
        return 'info';
    }
  }
}
