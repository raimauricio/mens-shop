import { IProduct } from "./product.interface";
import { ICartao, IEndereco } from "./user.interface";

export interface ICompra {
  data: string;
  produtos: IProduct[];
  pagamento: IPagamento;
  recebimento:IRecebimento;
}

export interface IRecebimento{
  tipo: string;
  enderecoEntrega?: IEndereco;
  retiradaLoja?: ILoja;
}

export interface IPagamento {
  valorTotal: number;
  formaPagamento: string;
  cartaoUsado?: ICartao;
}

export interface ILoja{
  id: string;
  nome: string;
  endereco: string;
}
