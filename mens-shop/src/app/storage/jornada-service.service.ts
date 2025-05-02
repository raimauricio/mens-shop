import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { IUser } from '../interfaces/user.interface';
import { IItemCarrinho } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class JornadaServiceService {
  private estaLogado: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private itensCarrinho: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  private usuario: BehaviorSubject<IUser> = new BehaviorSubject(null);
  concluirCompra: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getItensCarrinho() {
    return this.itensCarrinho.getValue();
  }

  getEstaLogado() {
    return this.estaLogado.getValue();
  }

  getUser() {
    return this.usuario.getValue();
  }

  setUser(user: IUser) {
    this.usuario.next(user);
    this.estaLogado.next(true);
  }

  getQuantidadeCarrinho() {
    return this.itensCarrinho.value.length;
  }

  getNomeUsuario() {
    return this.usuario.value?.nome;
  }

  adicionarItemCarrinho(item: IProduct) {
    const itens = this.getItensCarrinho();
    itens.push(item);
    this.itensCarrinho.next(itens);
  }

  removerItemCarrinho(item: IProduct, quantidade = 1) {
    const itens = this.getItensCarrinho();
    itens.splice(itens.findIndex(itemCarrinho => itemCarrinho === item), quantidade);
    this.itensCarrinho.next(itens);
  }

  getMontaCarrinho():IItemCarrinho[] {
    if(!this.getQuantidadeCarrinho()) return [];
    const itensCarrinho = this.getItensCarrinho();
    const carrinhoDeCompras: IItemCarrinho[] = [];
    itensCarrinho.forEach(item => {
      const itemCarrinho =
        carrinhoDeCompras.find(
          itemCarrinho => itemCarrinho.produto.id === item.id &&
          itemCarrinho.tamanhoSelecionado === item.tamanhoSelecionado.code
        );
      if(itemCarrinho) {
        itemCarrinho.quantidade++;
      } else {
        carrinhoDeCompras.push({
          quantidade: 1,
          tamanhoSelecionado: item.tamanhoSelecionado.code,
          produto: item
        });
      }
    });
    return carrinhoDeCompras;
  }

  sair(){
    this.estaLogado.next(false);
    this.limparCarrinho();
    this.usuario.next(null);
  }

  limparCarrinho() {
    this.itensCarrinho.next([]);
  }
}
