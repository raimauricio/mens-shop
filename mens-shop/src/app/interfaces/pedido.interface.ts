import { IProduct } from "./product.interface";

export interface IPedido {
  id: string;
  dataCompra: Date;
  valorTotal: number;
  statusAtual: string;
  tipoRecebimento
  produtos: IProduct[];
  etapas: IEtapa[];
}

export interface IEtapa{
  status: string;
  data: Date;
  icon: string;
}
