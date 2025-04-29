import { IProduct } from "./product.interface";

export interface IUser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  cartoesCadastrados: ICartao[];
  endereco: IEndereco;
  compras: ICompra[];
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
  rua: string;
  numero: string;
  pais: string;
}

export interface ICompra {
  data: string;
  produtos: IProduct[];
  valorTotal: number;
  enderecoEntrega: IEndereco;
  cartaoUsado: ICartao;
}

