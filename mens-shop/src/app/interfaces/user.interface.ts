import { IItemCarrinho } from "./product.interface";

export interface IUser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  cartoes: ICartao[];
  enderecos: IEndereco[];
  carrinho: IItemCarrinho[];
}

export interface ICartao {
  id: number;
  numero: string;
  nome: string;
  dataValidade: string;
  codigoSeguranca: string;
}

export interface IEndereco {
  id: number;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento?: string;
}

