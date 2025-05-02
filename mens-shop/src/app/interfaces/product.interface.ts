export interface IProduct {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  categoria: string;
  tamanhos: Array<number>;
  tamanhoSelecionado?: { code: number, nome: string };
}

export interface IItemCarrinho {
  quantidade: number;
  tamanhoSelecionado: number;
  produto: IProduct;
}
