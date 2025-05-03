import { Component, inject, OnInit } from '@angular/core';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { IItemCarrinho } from '../../interfaces/product.interface';
import { PrimeModule } from '../../shared/prime-module/prime.module';

@Component({
  selector: 'app-resume-cart',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './resume-cart.component.html',
  styleUrl: './resume-cart.component.scss'
})
export class ResumeCartComponent implements OnInit {

  carrinhoDeCompras: IItemCarrinho[];
  jornadaService = inject(JornadaServiceService)

  ngOnInit(): void {
    this.carrinhoDeCompras = this.jornadaService.getMontaCarrinho();
  }

  getTotal() {
    return this.jornadaService.getValorTotalCompras();
  }
}
