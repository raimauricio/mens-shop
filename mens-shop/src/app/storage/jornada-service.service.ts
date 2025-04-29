import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class JornadaServiceService {
  private estaLogado: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private itensCarrinho: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  private usuario: BehaviorSubject<IUser> = new BehaviorSubject(null);

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

  adicionarItemCarrinho(item: IProduct) {
    const itens = this.itensCarrinho.value;
    itens.push(item);
    this.itensCarrinho.next(itens);
  }

  removerItemCarrinho(item: IProduct) {
    const itens = this.itensCarrinho.value.filter(i => i !== item);
    this.itensCarrinho.next(itens);
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
