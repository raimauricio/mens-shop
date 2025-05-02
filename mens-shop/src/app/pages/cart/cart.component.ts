import { Component, inject, OnInit } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { ROTAS } from '../../const/rotas.const';
import { IItemCarrinho } from '../../interfaces/product.interface';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PrimeModule, BasePageComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  jornadaService = inject(JornadaServiceService);
  carrinhoDeCompras: IItemCarrinho[] = [];
  rotas = ROTAS;

  get estaLogado() {
    return this.jornadaService.getEstaLogado();
  }

  ngOnInit(): void {
    this.montaCarrinho();
  }

  aumentarQuantidade(index: number): void {
    this.carrinhoDeCompras[index].quantidade++;
    this.jornadaService.adicionarItemCarrinho(this.carrinhoDeCompras[index].produto);
  }

  diminuirQuantidade(index: number): void {
    if (this.carrinhoDeCompras[index].quantidade > 1) {
      this.carrinhoDeCompras[index].quantidade--;
      this.jornadaService.removerItemCarrinho(this.carrinhoDeCompras[index].produto);
    } else this.removeItem(index);
  }

  removeItem(index: number): void {
    this.jornadaService.removerItemCarrinho(this.carrinhoDeCompras[index].produto, this.carrinhoDeCompras[index].quantidade);
    this.carrinhoDeCompras.splice(index, 1);
  }

  getTotal(): number {
    return this.carrinhoDeCompras.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
  }

  concluirCompra() {
    if (!this.estaLogado)
      this.jornadaService.concluirCompra.next(true);
  }

  montaCarrinho() {
    const itensCarrinho = this.jornadaService.getItensCarrinho();
    itensCarrinho.forEach(item => {
      const itemCarrinho = this.carrinhoDeCompras.find(c => c.produto.id === item.id && c.tamanhoSelecionado === item.tamanhoSelecionado.code);
      if(itemCarrinho) {
        itemCarrinho.quantidade++;
      } else {
        this.carrinhoDeCompras.push({
          quantidade: 1,
          tamanhoSelecionado: item.tamanhoSelecionado.code,
          produto: item
        });
      }
    });
  }
}
