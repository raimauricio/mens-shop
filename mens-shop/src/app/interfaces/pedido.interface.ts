export interface IPedido {
  id: string;
  dataCompra: string;
  valorTotal: number;
  statusAtual: string;
  tipoRecebimento: string;
  produtos: IProduto[];
  etapas: IEtapa[];
}

export interface IEtapa{
  status: string;
  data: string;
  icon: string;
}

interface IProduto{
  nome: string;
  tamanho: string;
  preco: number;
}
