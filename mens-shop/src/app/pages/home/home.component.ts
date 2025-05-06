
import { Component, inject, OnInit } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { ProductsPanelComponent } from '../../components/products-panel/products-panel.component';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BasePageComponent, ProductsPanelComponent, PrimeModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ProductService]
})
export class HomeComponent implements OnInit{
  jornadaService = inject(JornadaServiceService);
  productService = inject(ProductService)
  products: IProduct[];
  pesquisaProduto: string;


  get estaLogado() {
    return this.jornadaService.getEstaLogado();
  }

  get nomeUsuario() {
    return this.jornadaService.getNomeUsuario();
  }

  ngOnInit(): void {
    this.productService.getProdutos().subscribe({
      next: (response) => {
        this.products = response;
      }
    });
  }
}
