export interface IProduct {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  categoria: string;
  tamanhos: Array<number>;
  tamanhoSelecionado?: number;
}
