import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { ICartao, IEndereco, IUser } from '../interfaces/user.interface';
import { IItemCarrinho } from '../interfaces/product.interface';
import { ICompra, ILoja, IPagamento, IRecebimento } from '../interfaces/compra.interface';
import { IPedido } from '../interfaces/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class JornadaServiceService {
  estadoInicialCompra: ICompra = {
    data: null,
    produtos: null,
    pagamento: {
      formaPagamento: null,
      valorTotal: null,
      cartaoUsado: null,
    },
    recebimento: {
      tipo: null,
      enderecoEntrega: null,
      retiradaLoja: null
    }
  }
  private estaLogado: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private itensCarrinho: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  private usuario: BehaviorSubject<IUser> = new BehaviorSubject(null);
  private tokenUsuario: BehaviorSubject<string> = new BehaviorSubject(null);
  private compra: BehaviorSubject<ICompra> = new BehaviorSubject(this.estadoInicialCompra);
  logoffMensagem:  BehaviorSubject<{severity: string, summary: string}[]> = new BehaviorSubject(null);
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

  setUser(user: IUser, token: string) {
    this.logoffMensagem.next(null);
    this.usuario.next(user);
    this.estaLogado.next(true);
    this.tokenUsuario.next(token);
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

  getValorTotalCompras(): number {
    return this.getMontaCarrinho().reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);
  }

  getCartoesCadastrados(): ICartao[] {
    return this.usuario.value?.cartoes || null;
  }

  adicionarCartao(cartao: ICartao) {
    const usuario = this.usuario.getValue();
    if(usuario) {
      usuario.cartoes.push(cartao);
      this.usuario.next(usuario);
    }
  }

  setAdicionarProdutosCompra(){
    const compra = this.estadoInicialCompra;
    compra.produtos = this.itensCarrinho.getValue();
    compra.pagamento.valorTotal = this.getValorTotalCompras();
    this.compra.next(compra);
  }

  getEnderecoCliente(): IEndereco[] {
    return this.usuario.value?.enderecos || null;
  }

  setEnderecoCliente(endereco: IEndereco) {
    const usuario = this.usuario.getValue();
    if(usuario) {
      usuario.enderecos.push(endereco);
      this.usuario.next(usuario);
    }
  }

  adicionaRetiradaLoja(loja: ILoja){
    const compra = this.compra.getValue();
    compra.recebimento = {
      tipo: 'retirada',
      retiradaLoja: loja,
      enderecoEntrega: null
    }
  }

  adicionaEnderecoEntrega(endereco: IEndereco){
    const compra = this.compra.getValue();
    compra.recebimento = {
      tipo: 'entrega',
      retiradaLoja: null,
      enderecoEntrega: endereco
    }
  }

  adicionarFormaPagamento(formaPagamento: string, cartaoUsado?: ICartao){
    const compra = this.compra.getValue();
    const cartao = ['debito','credito'];

    compra.pagamento = {
      formaPagamento: formaPagamento,
      valorTotal: this.getValorTotalCompras(),
      cartaoUsado: cartao.includes(formaPagamento) ? cartaoUsado : null
    }
  }

  getDadosResumoCompra(): { pagamento: IPagamento, recebimento: IRecebimento}{
    const compra = this.compra.getValue();

    return {
      pagamento: compra.pagamento,
      recebimento: compra.recebimento
    }
  }

  sair(){
    this.estaLogado.next(false);
    this.limparCarrinho();
    this.usuario.next(null);
    this.tokenUsuario.next(null);
    this.compra.next(this.estadoInicialCompra);
    this.logoffMensagem.next([{severity: 'info', summary: 'Logoff realizado com sucesso! Realize o login para continuar as compras ou acompanhar os status.'}]);
    setTimeout(() => {
      this.logoffMensagem.next(null);
    }, 5000)
  }

  finalizarPedido(){
    const compra = this.compra.getValue();
    compra.data = new Date(Date.now()).toISOString();
    const pedido: IPedido = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      dataCompra: compra.data,
      produtos: compra.produtos.map(produto => {
        console.log(produto.tamanhoSelecionado)
        return {
          nome: produto.nome,
          preco: produto.preco,
          tamanho: produto.tamanhoSelecionado.name
        }
      }),
      statusAtual: 'Processando pagamento',
      tipoRecebimento: compra.pagamento.formaPagamento === 'retirada' ? 'Retirada em loja' : 'Entrega',
      valorTotal: this.getValorTotalCompras(),
      etapas: [
        {
          data: new Date(Date.now()).toISOString(),
          icon: "pi pi-credit-card",
          status: 'Processando pagamento'
        }
      ]
    }
    this.limparCarrinho();
  }

  limparCarrinho() {
    this.itensCarrinho.next([]);
  }
}
