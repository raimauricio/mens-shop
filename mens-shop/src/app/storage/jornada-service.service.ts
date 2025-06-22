import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { ICartao, IEndereco, IUser } from '../interfaces/user.interface';
import { IItemCarrinho } from '../interfaces/product.interface';
import { ICompra, IPagamento, IProdutoComprado, IRecebimento } from '../interfaces/compra.interface';

@Injectable({
  providedIn: 'root'
})
export class JornadaServiceService {
  estadoInicialCompra: ICompra = {
    produtos: [],
    pagamento: {
      tipo: null,
      cartao: null,
      valorTotal: null,
    },
    recebimento: {
      tipo: null,
      endereco: null,
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
  produtosDisponiveis: IProduct[] = [];

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
    this.incluirCarrinhoUsuario(user.carrinho);
  }

  getTokenUsuario() {
    return this.tokenUsuario.getValue();
  }

  getCompra() {
    return this.compra.getValue();
  }

  incluirCarrinhoUsuario(carrinho: IItemCarrinho[]) {
    if(carrinho?.length > 0) {
      const produtos: IProduct[] = [];
      carrinho.forEach(item => {
        const produto = this.produtosDisponiveis.find(produto => produto.id === item.produto.id);
        if(produto) {
            for (let i = 0; i < item.quantidade; i++) {
              produtos.push({
              ...produto,
              tamanhoSelecionado: {code: item.tamanhoSelecionado, name: item.tamanhoSelecionado}
            });
          }
        }
      });
      this.itensCarrinho.getValue().push(...produtos);
    }
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
    const produtosComprados: IProdutoComprado[] = this.getMontaCarrinho()
      .map(item => (
        {
          produtoId: item.produto.id,
          quantidade: item.quantidade,
          tamanhoSelecionado: item.tamanhoSelecionado
        } as unknown as IProdutoComprado
      )
    );

    const compra = this.estadoInicialCompra;
    compra.produtos = produtosComprados;
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

  adicionaRetiradaLoja(loja: number = null){
    const compra = this.compra.getValue();
    compra.recebimento = {
      tipo: 'retirada',
      retiradaLoja: loja,
      endereco: null
    }
  }

  adicionaEnderecoEntrega(endereco: IEndereco){
    const compra = this.compra.getValue();
    compra.recebimento = {
      tipo: 'entrega',
      retiradaLoja: null,
      endereco: endereco
    }
  }

  adicionarFormaPagamento(formaPagamento: string, cartaoUsado?: ICartao){
    const compra = this.compra.getValue();
    const cartao = ['debito','credito'];

    compra.pagamento = {
      tipo: formaPagamento,
      valorTotal: this.getValorTotalCompras(),
      cartao: cartao.includes(formaPagamento) ? cartaoUsado : null
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
    setTimeout(() => {
      this.logoffMensagem.next(null);
    }, 5000)
  }

  finalizarPedido(){
    this.limparCarrinho();
  }

  limparCarrinho() {
    this.itensCarrinho.next([]);
  }
}
