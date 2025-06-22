
import { Component, inject, OnInit } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { ProductsPanelComponent } from '../../components/products-panel/products-panel.component';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BasePageComponent, ProductsPanelComponent, ReactiveFormsModule, PrimeModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ProductService]
})
export class HomeComponent implements OnInit{
  jornadaService = inject(JornadaServiceService);
  productService = inject(ProductService);
  formBuilder = inject(FormBuilder)
  products: IProduct[];
  produtosFiltrados: IProduct[] = [];
  pesquisaSub: Subscription;
  formPesquisaProduto = this.formBuilder.group({
    pesquisa: ['']
  });

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
        this.jornadaService.produtosDisponiveis = this.products;
        this.produtosFiltrados = [...this.products]
      }
    });
    this.subInscreverNaPesquisa();
  }

  subInscreverNaPesquisa(){
    this.pesquisaSub = this.formPesquisaProduto.get('pesquisa')!.valueChanges
    .pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(valor => this.filtrarProdutos(valor))
    )
    .subscribe(resultado => {
      this.produtosFiltrados = resultado;
    });
  }

  filtrarProdutos(valorPesquisa: string): any[] {
    if (!valorPesquisa || valorPesquisa.trim() === '') {
      return [...this.products];
    }

    const valorLower = valorPesquisa.toLowerCase();

    return this.products.filter(produto =>
      produto.nome.toLowerCase().includes(valorLower) ||
      produto.categoria.toLowerCase().includes(valorLower)
    );
  }
}
