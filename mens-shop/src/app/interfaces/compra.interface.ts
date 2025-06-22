import { IProduct } from "./product.interface";
import { ICartao, IEndereco } from "./user.interface";

export interface ICompra {
  produtos: IProdutoComprado[];
  pagamento: IPagamento;
  recebimento:IRecebimento;
}

export interface IRecebimento{
  tipo: string;
  endereco?: IEndereco;
  retiradaLoja?: number;
}

export interface IPagamento {
  tipo: string;
  valorTotal: number;
  cartao?: ICartao;
}

export interface IProdutoComprado {
  produtoId: IProduct;
  quantidade: number;
  tamanhoSelecionado: String
}
