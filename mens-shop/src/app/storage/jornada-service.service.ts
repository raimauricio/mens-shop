import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class JornadaServiceService {
  private estaLogado: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private itensCarrinho: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);

  getEstaLogado() {
    return this.estaLogado.getValue();
  }

  getQuantidadeCarrinho() {
    return this.itensCarrinho.value.length;
  }

  adicionarItemCarrinho(item: IProduct) {
    const itens = this.itensCarrinho.value;
    itens.push(item);
    this.itensCarrinho.next(itens);
  }

  removerItemCarrinho(item: IProduct) {
    const itens = this.itensCarrinho.value.filter(i => i !== item);
    this.itensCarrinho.next(itens);
  }

  limparCarrinho() {
    this.itensCarrinho.next([]);
  }
}
