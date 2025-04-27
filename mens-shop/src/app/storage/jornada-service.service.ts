import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JornadaServiceService {
  private estaLogado: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private itensCarrinho: BehaviorSubject<any[]> = new BehaviorSubject([]);

  getEstaLogado() {
    return this.estaLogado.getValue();
  }

  getQuantidadeCarrinho() {
    return this.itensCarrinho.value.length;
  }

  adicionarItemCarrinho(item: any) {
    const itens = this.itensCarrinho.value;
    itens.push(item);
    this.itensCarrinho.next(itens);
  }

  removerItemCarrinho(item: any) {
    const itens = this.itensCarrinho.value.filter(i => i !== item);
    this.itensCarrinho.next(itens);
  }

  limparCarrinho() {
    this.itensCarrinho.next([]);
  }
}
