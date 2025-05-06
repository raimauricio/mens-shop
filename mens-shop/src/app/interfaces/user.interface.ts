import { IPedido } from "./pedido.interface";
import { IProduct } from "./product.interface";

export interface IUser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  cartoesCadastrados: ICartao[];
  enderecos: IEndereco[];
  minhasCompras: IPedido[];
  carrinho: IProduct[];
}

export interface ICartao {
  numero: string;
  nome: string;
  validade: string;
  cvv: string;
}

export interface IEndereco {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento?: string;
}

