import { Component, inject, OnInit } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { IPedido } from '../../interfaces/pedido.interface';
import { Router } from '@angular/router';
import { ROTAS } from '../../const/rotas.const';

@Component({
  selector: 'app-my-shopping',
  standalone: true,
  imports: [PrimeModule, BasePageComponent],
  templateUrl: './my-shopping.component.html',
  styleUrl: './my-shopping.component.scss'
})
export class MyShoppingComponent implements OnInit{
  jornadaStorage = inject(JornadaServiceService);
  router = inject(Router);

  ngOnInit(): void {
    if(!this.jornadaStorage.getEstaLogado())
      this.router.navigate([ROTAS.HOME]);
  }

  get pedidos(): IPedido[]{
    return this.jornadaStorage.getPedidosUsuario();
  }

  getStatusColor(status: string): 'info' | 'success' | 'warning' | 'danger' {
    switch (status) {
      case 'Pagamento processado':
        return 'info';
      case 'Separando pedido':
        return 'warning';
      case 'A caminho da entrega':
      case 'Disponível para retirada':
        return 'success';
      case 'Entregue':
        return 'success';
      default:
        return 'info';
    }
  }
}
